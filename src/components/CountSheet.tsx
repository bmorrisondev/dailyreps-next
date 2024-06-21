'use client'
import React from 'react'
import { Button } from './ui/button'

type Props = {
  repsBeingAdded: number
  setRepsBeingAdded: (reps: number) => void
}

function CountSheet({ repsBeingAdded, setRepsBeingAdded }: Props) {
  return (
    <>
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
    </>
  )
}

export default CountSheet