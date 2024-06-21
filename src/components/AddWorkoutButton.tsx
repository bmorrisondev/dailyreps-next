'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { addTimedWorkout, addWorkout, getRepsForWorkout } from '@/actions'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { WorkoutTypeEnum } from '@/models'

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  reps: z.string().transform((v) => Number(v)||0).optional(),
  minutes: z.string().transform((v) => Number(v)||0).optional(),
  seconds: z.string().transform((v) => Number(v)||0).optional(),
  type: z.enum(['count', 'time']).default('count'),
});

function AddWorkoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [targetType, setTargetType] = useState(1)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    form.reset()
    setTargetType(WorkoutTypeEnum.Count)
  },[isModalOpen])

  useEffect(() => {
    form.watch((value) => {
      if(value.type === 'count') {
        setTargetType(WorkoutTypeEnum.Count)
      }
      if(value.type === 'time') {
        setTargetType(WorkoutTypeEnum.Time)
      }
    });
  }, [form.watch])

  async function onOpenChange(open: boolean) {
    setIsModalOpen(open)
  }

  async function onSubmit(data: z.infer<typeof schema>) {
    if(data.type === 'time') {
      let reps = 0
      if(data.minutes) {
        reps += data.minutes * 60
      }
      if(data.seconds) {
        reps += data.seconds
      }
      await addTimedWorkout(data.name, reps)
    } else {
      await addWorkout(data.name, data.reps as number)
    }
    setIsModalOpen(false)
    window.location.reload()
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={isModalOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>
          Add workout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add workout</DialogTitle>
          <DialogDescription className='text-left'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workout name</FormLabel>
                      <FormControl>
                        <Input placeholder="Workout name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Metric type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue="count"
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="count" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Count
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="time" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Time (ex: Planks)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {targetType === WorkoutTypeEnum.Count ? (
                  <FormField control={form.control} name="reps" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target reps</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Reps" defaultValue={100} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <>
                    <FormField control={form.control} name="minutes" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minutes</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Minutes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField control={form.control} name="seconds" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seconds</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Seconds" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <Button type="submit">
                  Save
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddWorkoutButton