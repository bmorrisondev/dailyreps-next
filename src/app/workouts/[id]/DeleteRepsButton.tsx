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
import { DeleteIcon } from 'lucide-react'
import { RepRecord, Workout } from '@/models'
import { Button } from '@/components/ui/button'
import { deleteReps } from '@/actions'

type Props = {
  workout: Workout
  reps: RepRecord
}

function DeleteRepsButton({ reps, workout }: Props) {
  const deleteOn = `${new Date(Number(reps.added_on)).toLocaleDateString()} at ${new Date(Number(reps.added_on)).toLocaleTimeString()}`

  async function deleteRep() {
    await deleteReps(reps.id as number)
    window.location.reload()
  }

  return (
    <Dialog>

      <DialogTrigger asChild>
        <DeleteIcon className='hover:text-red-500 hover:cursor-pointer' />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete reps</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete these reps?: <br />
            {reps.count} {workout.name} on {deleteOn}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant='destructive' onClick={deleteRep}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteRepsButton