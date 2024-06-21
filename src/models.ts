export enum WorkoutTypeEnum {
  Count = 0,
  Time = 1
}

export type Workout = {
  id?: number
  name?: string
  isarchived?: boolean
  targetreps?: number
  reps?: RepRecord[]
  type?: WorkoutTypeEnum
}

export type RepRecord = {
  id?: number
  workoutid: number
  count: number
  added_on: number
}