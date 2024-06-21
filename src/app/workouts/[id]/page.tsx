import { getRepsForWorkout, getWorkout } from '@/actions'
import { RepRecord, WorkoutTypeEnum } from '@/models'
import React from 'react'
import DeleteRepsButton from './DeleteRepsButton'
import DeleteWorkoutButton from './DeleteWorkoutButton'
import { secondsToTimestamp } from '@/utils'

export const fetchCache = 'force-no-store';

async function Workout({ params }: { params: { id: string } }) {

  const wo = await getWorkout(Number(params.id))
  const reps = await getRepsForWorkout(Number(params.id))

  // TODO: type this
  const repsOrganized: any = {}
  reps.forEach((r) => {
    let d = new Date(Number(r.added_on))
    if(!repsOrganized[d.toLocaleDateString()]) {
      repsOrganized[d.toLocaleDateString()] = []
    }
    repsOrganized[d.toLocaleDateString()].push(r)
  })

  return (
    <div className="p-4">
      <div className='flex items-center justify-between'>
        <h1 className="font-bold text-2xl">{wo.name}</h1>
        <DeleteWorkoutButton workout={wo} />
      </div>
      <h2 className="font-bold">Reps</h2>
      <ul>
        {Object.keys(repsOrganized).map((k) => (
          <li key={k} className='mb-2'>
            <h3 className="italic">{k}</h3>
            <hr className='mb-1' />
            <ul>
              {repsOrganized[k].map((r: RepRecord) => (
                <li key={r.id} className='mb-1 flex justify-between'>
                  <span>
                    {wo.type === WorkoutTypeEnum.Count ? r.count : secondsToTimestamp(r.count)} at {new Date(Number(r.added_on)).toLocaleTimeString()}
                  </span>
                  <div>
                    <DeleteRepsButton workout={wo} reps={r} />
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Workout