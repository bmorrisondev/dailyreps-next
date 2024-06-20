'use client'
import { RepRecord, Workout } from '@/models'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addRepsToWorkout } from '@/actions'
import ProgressBar from './ProgressBar'

type Props = {
  workout: Workout
}

function LogRepsButton({ workout }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [repsBeingAdded, setRepsBeingAdded] = useState(10)
  const [currentReps, setCurrentReps] = useState(0)

  useEffect(() => {
    let count = 0
    if (workout.reps && workout.reps.length > 0) {
      workout?.reps?.forEach((r: RepRecord) => (count += r.count))
    }
    setCurrentReps(count)
  }, [workout])

  async function onOpenChange(open: boolean) {
    setRepsBeingAdded(10)
    setIsModalOpen(open)
  }

  async function save() {
    await addRepsToWorkout(workout.id as number, repsBeingAdded)
    setCurrentReps(currentReps + repsBeingAdded)
    setIsModalOpen(false)
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={isModalOpen}>

      <DialogTrigger asChild>
        <Button variant='secondary' className='w-full flex flex-col'>
          {workout.name} ({currentReps}/{workout.targetreps})
          <ProgressBar reps={currentReps} targetReps={workout.targetreps as number} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add reps to {workout.name}</DialogTitle>
          <DialogDescription>
            <div className='grid grid-cols-2 gap-4'>
              <span className="col-span-2 font-bold text-4xl mb-2 flex justify-center">{repsBeingAdded}</span>
              <Button
                variant='secondary'
                onClick={() => setRepsBeingAdded(repsBeingAdded - 1)}
                disabled={repsBeingAdded === 0}
              >
                -1
              </Button>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(repsBeingAdded + 1)}>
                +1
              </Button>
              <Button
                variant='secondary'
                onClick={() => setRepsBeingAdded(repsBeingAdded - 5)}
                disabled={repsBeingAdded < 5}
              >
                -5
              </Button>
              <Button
                variant='secondary' onClick={() => setRepsBeingAdded(repsBeingAdded + 5)}>
                +5
              </Button>
              <div className="col-span-2 text-center mt-3 font-bold">
                Quick Values
              </div>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(10)}>
                10
              </Button>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(20)}>
                20
              </Button>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(30)}>
                30
              </Button>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(40)}>
                40
              </Button>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(50)}>
                50
              </Button>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(60)}>
                60
              </Button>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(70)}>
                70
              </Button>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(80)}>
                80
              </Button>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(90)}>
                90
              </Button>
              <Button variant='secondary' onClick={() => setRepsBeingAdded(100)}>
                100
              </Button>
              <hr className='col-span-2' />
              <Button variant='secondary' onClick={() => save()} className='col-span-2'>
                Save
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default LogRepsButton