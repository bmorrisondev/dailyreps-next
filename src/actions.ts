'use server'

import { auth } from '@clerk/nextjs/server';
import { RepRecord, Workout } from './models'
import postgres from "postgres";

let {
  PGHOST,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  ENDPOINT_ID
} = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require'
});

export async function getWorkouts(): Promise<Workout[]> {
  const { userId } = auth()
  if(!userId) {
    throw new Error("User not found");
  }

  let workouts = await sql`SELECT * FROM workouts
  WHERE userid = ${userId} and
  (isarchived = false or isarchived is null)` as Workout[]
  let midnight = new Date().setHours(0, 0, 0, 0)
  let reps = await sql`SELECT * FROM reps where added_on > ${midnight} and userid = ${userId}` as RepRecord[]

  workouts.forEach((w: Workout) => {
    w.reps = reps.filter((r: RepRecord) => r.workoutid === w.id)
  })
  return workouts
}

export async function addRepsToWorkout(workoutId: number, count: number) {
  const { userId } = auth()
  if(!userId) {
    throw new Error("User not found");
  }

  let newreps: RepRecord = {
    workoutid: workoutId,
    count,
    added_on: new Date().getTime(),
  }
  await sql`INSERT INTO reps (workoutid, count, added_on, userid)
    VALUES (${newreps.workoutid}, ${newreps.count}, ${newreps.added_on}, ${userId})`
}

export async function addWorkout(name: string, targetreps: number) {
  const { userId } = auth()
  if(!userId) {
    throw new Error("User not found");
  }
  await sql`INSERT INTO workouts (name, targetreps, userid) VALUES (${name}, ${targetreps}, ${userId})`
}