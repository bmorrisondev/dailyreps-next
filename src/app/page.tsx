import LogRepsButton from "@/components/LogRepsButton"
import { Workout } from "@/models"
import React, { useState, useEffect } from "react"
import { getWorkouts } from "@/actions"
import AddWorkoutButton from "@/components/AddWorkoutButton"

export const fetchCache = 'force-no-store';

async function IndexPage() {
  const workouts = await getWorkouts()

  return (
    <div className="flex flex-col p-4">
      <div className="grid gap-2">
        {workouts.map((el, idx) => (
          <LogRepsButton key={idx} workout={el} />
        ))}
        <hr />
        <AddWorkoutButton />
      </div>
    </div>
  )
}

export default IndexPage
