import React from 'react'

type Props = {
  reps: number
  targetReps: number
}

function ProgressBar({ reps, targetReps }: Props) {
  const w = reps / targetReps > 1 ? 100 : (reps / targetReps) * 100
  return (
    <div className='h-[5px] bg-[#dee4eb] w-full rounded relative'>
      &nbsp;
      <div
        className='h-[5px] bg-[#3bd16f] absolute top-0 left-0 rounded'
        style={{
          width: `${w}%`
        }}>
        &nbsp;
      </div>
    </div>
  )
}

export default ProgressBar