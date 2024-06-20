'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Workout } from '@/models'
import { Button } from '@/components/ui/button'
import { deleteWorkout } from '@/actions'

type Props = {
  workout: Workout
}

function DeleteWorkoutButton({ workout }: Props) {

  async function onDeleteClicked() {
    await deleteWorkout(workout.id as number)
    window.location.href = '/workouts'
  }

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button className='hover:bg-red-500 hover:cursor-pointer'>
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {workout.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {workout.name}? <br />
            All reps recorded will be deleted as well. <br />
            This action <strong>CANNOT</strong> be undone...
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant='destructive' onClick={onDeleteClicked}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteWorkoutButton