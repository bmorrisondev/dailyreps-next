'use client'
import LogRepsButton from "@/components/LogRepsButton"
import { Workout } from "@/models"
import React, { useState, useEffect } from "react"
import { getWorkouts } from "@/actions"
import AddWorkoutButton from "@/components/AddWorkoutButton"

const IndexPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    loadWorkouts()
  }, [])

  async function loadWorkouts() {
    const w = await getWorkouts()
    setWorkouts(w)
  }

  return (
    <div className="flex flex-col p-4">
      <div className="grid gap-2">
        {workouts.map((el, idx) => (
          <LogRepsButton key={idx} workout={el} />
        ))}
        <hr />
        <AddWorkoutButton onWorkoutAdded={loadWorkouts} />
      </div>
    </div>
  )
}

export default IndexPage
