export type Workout = {
  id?: number
  name?: string
  isarchived?: boolean
  targetreps?: number
  reps?: RepRecord[]
}

export type RepRecord = {
  id?: number
  workoutid: number
  count: number
  added_on: number
}