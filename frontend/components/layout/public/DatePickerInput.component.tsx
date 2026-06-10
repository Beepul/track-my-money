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

function formatDateForInput(date: Date | undefined) {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateOnly(dateString?: string) {
  if (!dateString) return undefined;

  const [year, month, day] = dateString.split("T")[0].split("-").map(Number);

  return new Date(year, month - 1, day);
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
  name: string,
  defaultDate?: string;
}

const DatePickerInput = ({label,id, name, defaultDate}: DatePickerProps) => {
  const initialDate = parseDateOnly(defaultDate);
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(initialDate)
  const [month, setMonth] = useState<Date | undefined>(initialDate || new Date())
  const [value, setValue] = useState(formatDate(initialDate))



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
          value={formatDateForInput(date)}
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
