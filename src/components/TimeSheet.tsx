'use client'
import React from 'react'
import { Button } from './ui/button'
import { secondsToTimestamp } from '@/utils'

type Props = {
  repsBeingAdded: number
  setRepsBeingAdded: (reps: number) => void
}

function TimeSheet({ repsBeingAdded, setRepsBeingAdded }: Props) {
  return (
    <>
      <span className="col-span-2 font-bold text-4xl mb-2 flex justify-center">
        {/* {repsBeingAdded < 60 ? '0' : Math.ceil(repsBeingAdded/60)}:{repsBeingAdded % 60 < 10 ? `0${repsBeingAdded % 60}` : repsBeingAdded % 60} */}
        {secondsToTimestamp(repsBeingAdded)}
      </span>
      <Button
        variant='secondary'
        onClick={() => setRepsBeingAdded(repsBeingAdded - 1)}
        disabled={repsBeingAdded === 1}
      >
        -0:01
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(repsBeingAdded + 1)}>
        +0:01
      </Button>
      <Button
        variant='secondary'
        onClick={() => setRepsBeingAdded(repsBeingAdded - 15)}
        disabled={repsBeingAdded < 15}
      >
        -0:15
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(repsBeingAdded + 15)}>
        +0:15
      </Button>
      <Button
        variant='secondary'
        onClick={() => setRepsBeingAdded(repsBeingAdded - 30)}
        disabled={repsBeingAdded < 30}
      >
        -0:30
      </Button>
      <Button
        variant='secondary' onClick={() => setRepsBeingAdded(repsBeingAdded + 30)}>
        +0:30
      </Button>
      <div className="col-span-2 text-center mt-3 font-bold">
        Quick Values
      </div>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(15)}>
        0:15
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(30)}>
        0:30
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(45)}>
        0:45
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(60)}>
        1:00
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(90)}>
        1:30
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(120)}>
        2:00
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(150)}>
        2:30
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(180)}>
        3:00
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(240)}>
        4:00
      </Button>
      <Button variant='secondary' onClick={() => setRepsBeingAdded(300)}>
        5:00
      </Button>
    </>
  )
}

export default TimeSheet