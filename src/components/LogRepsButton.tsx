'use client'
import { RepRecord, Workout, WorkoutTypeEnum } from '@/models'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addRepsToWorkout } from '@/actions'
import ProgressBar from './ProgressBar'
import CountSheet from './CountSheet'
import TimeSheet from './TimeSheet'
import { secondsToTimestamp } from '@/utils'

type Props = {
  workout: Workout
}

function LogRepsButton({ workout }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [repsBeingAdded, setRepsBeingAdded] = useState(0)
  const [currentReps, setCurrentReps] = useState(0)
  const [progressStr, setProgressStr] = useState('')

  useEffect(() => {
    let count = 0
    if (workout.reps && workout.reps.length > 0) {
      workout?.reps?.forEach((r: RepRecord) => (count += r.count))
    }
    setCurrentReps(count)
  }, [workout])

  useEffect(() => {
    if (workout.type === WorkoutTypeEnum.Count) {
      setProgressStr(`${currentReps}/${workout.targetreps}`)
    } else {
      setProgressStr(`${secondsToTimestamp(currentReps)}/${secondsToTimestamp(workout.targetreps as number)}`)
    }
  }, [currentReps])

  async function onOpenChange(open: boolean) {
    if(workout.type === WorkoutTypeEnum.Count) {
      setRepsBeingAdded(10)
    } else {
      setRepsBeingAdded(30)
    }
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
          {workout.name} ({progressStr})
          <ProgressBar reps={currentReps} targetReps={workout.targetreps as number} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add reps to {workout.name}</DialogTitle>
          <DialogDescription>
            <div className='grid grid-cols-2 gap-4'>
              {workout.type === WorkoutTypeEnum.Count ? (
                <CountSheet repsBeingAdded={repsBeingAdded} setRepsBeingAdded={setRepsBeingAdded} />
              ) : (
                <TimeSheet repsBeingAdded={repsBeingAdded} setRepsBeingAdded={setRepsBeingAdded} />
              )}
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