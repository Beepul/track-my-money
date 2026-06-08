'use client'

import { useState } from 'react'

import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

function formatDate(date: Date | undefined) {
  if (!date) {
    return ''
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }

  return !isNaN(date.getTime())
}

type DatePickerProps = {
  label: string,
  id: string,
  name: string
}

const DatePickerInput = ({label,id, name}: DatePickerProps) => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [month, setMonth] = useState<Date | undefined>(new Date())
  const [value, setValue] = useState("")



  return (
    <div className='w-full space-y-2'>
      <Label htmlFor={id} className='px-1 text-[16px] text-t2m-text-secondary font-normal'>
        {label}
      </Label>
      <div className='relative flex gap-2'>
        <Input
          id={id}
          value={value}
          placeholder='mm/dd/yyyy'
          className='bg-background pr-10 py-6'
          readOnly
          onChange={e => {
            const date = new Date(e.target.value)

            setValue(e.target.value)

            if (isValidDate(date)) {
              setDate(date)
              setMonth(date)
            }
          }}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <input
          type="hidden"
          name={name}
          value={date ? date.toISOString().split("T")[0] : ""}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button id='date-picker' variant='ghost' className='absolute top-1/2 right-2 size-6 -translate-y-1/2 cursor-pointer'>
              <CalendarIcon className='size-3.5' />
              <span className='sr-only'>Pick a date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto overflow-hidden p-0' align='end' alignOffset={-8} sideOffset={10}>
            <Calendar
              mode='single'
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={date => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default DatePickerInput
