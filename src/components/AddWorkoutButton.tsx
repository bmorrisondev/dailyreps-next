import React, { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addWorkout } from '@/actions'
import { Input } from "@/components/ui/input"

type Props = {
  onWorkoutAdded: () => void
}

function AddWorkoutButton({ onWorkoutAdded }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [workoutName, setWorkoutName] = useState("")
  const [targetReps, setTargetReps] = useState(100)

  async function onOpenChange(open: boolean) {
    setIsModalOpen(open)
  }

  async function save() {
    await addWorkout(workoutName, targetReps)
    setIsModalOpen(false)
    onWorkoutAdded()
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={isModalOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>
          Add workout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add workout</DialogTitle>
          <div className='flex flex-col gap-2'>
            <Input type='text' placeholder='Workout name' value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
            <Input type='number' placeholder='Target reps' value={targetReps} onChange={(e) => setTargetReps(parseInt(e.target.value))} />
          </div>
          <DialogDescription>
            <Button onClick={() => save()}>
              Save
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddWorkoutButton