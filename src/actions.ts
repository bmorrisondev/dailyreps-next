'use server'

import { auth } from '@clerk/nextjs/server';
import { RepRecord, Workout } from './models';
import { neon } from "@neondatabase/serverless";

// Initialize the neon client with the DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}
const sql = neon(process.env.DATABASE_URL);

export async function getWorkouts(): Promise<Workout[]> {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }

  let workouts = await sql`SELECT * FROM workouts
  WHERE userid = ${userId} and
  (isarchived = false or isarchived is null)` as Workout[];
  let midnight = new Date().setHours(0, 0, 0, 0);
  let reps = await sql`SELECT * FROM reps where added_on > ${midnight} and userid = ${userId}` as RepRecord[];

  workouts.forEach((w: Workout) => {
    w.reps = reps.filter((r: RepRecord) => r.workoutid === w.id);
  });
  return workouts;
}

export async function addRepsToWorkout(workoutId: number, count: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }

  let newreps: RepRecord = {
    workoutid: workoutId,
    count,
    added_on: new Date().getTime(),
  };
  await sql`INSERT INTO reps (workoutid, count, added_on, userid)
    VALUES (${newreps.workoutid}, ${newreps.count}, ${newreps.added_on}, ${userId})`;
}

export async function addWorkout(name: string, targetreps: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }
  await sql`INSERT INTO workouts (name, targetreps, userid) VALUES (${name}, ${targetreps}, ${userId})`;
}

export async function addTimedWorkout(name: string, targetreps: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }
  await sql`INSERT INTO workouts (name, targetreps, userid, type) VALUES (${name}, ${targetreps}, ${userId}, 1)`;
}

export async function getWorkoutsForList(): Promise<Workout[]> {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }

  let workouts = await sql`SELECT * FROM workouts
  WHERE userid = ${userId} and
  (isarchived = false or isarchived is null)` as Workout[];

  return workouts;
}

export async function getWorkout(workoutId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }

  let workout = await sql`SELECT * FROM workouts WHERE id = ${workoutId} and userid = ${userId}` as Workout[];
  return workout[0];
}

export async function getRepsForWorkout(workoutId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }

  let reps = await sql`SELECT * FROM reps WHERE workoutid = ${workoutId} and userid = ${userId}` as RepRecord[];
  reps.sort((a: RepRecord, b: RepRecord) => b.added_on - a.added_on);
  return reps;
}

export async function deleteReps(repsId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }

  await sql`DELETE FROM reps WHERE id = ${repsId} and userid = ${userId}`;
}

export async function deleteWorkout(workoutId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }

  await sql`DELETE FROM workouts WHERE id = ${workoutId} and userid = ${userId}`;
  await sql`DELETE FROM reps WHERE workoutid = ${workoutId} and userid = ${userId}`;
}