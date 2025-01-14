import { useEffect, useState } from 'react'
import { Button } from '@components'
import { blocksToText } from '../../common/helpers'

import { isAfter } from 'date-fns'
import { getEventDates, toUTCDateParts } from '../../common/helpers/dateUtilities'

import type { EventDateType } from '../../types/types'
import type { BlockNode } from '@sanity/block-content-to-react'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ics = require('ics')

type AddToCalendarProps = {
  eventDate: EventDateType
  location?: string
  title: BlockNode[]
}

type ICSProps = {
  start: number[]
  startInputType: string
  end: number[]
  endInputType: string
  title: string
  location?: string
}

// Because in 2021 we still have a zero-index month
// which means Jan = 0, Dec = 11, etc
const padMonth = (dateParts: number[]): number[] => {
  dateParts[1] = dateParts[1] + 1
  return dateParts
}

const isUpcoming = (eventDate: Date): boolean => {
  if (isAfter(eventDate, new Date())) {
    return true
  }
  return false
}

const createICS = (eventData: ICSProps): string | boolean => {
  return ics.createEvent(eventData, (error: any, value: string) => {
    if (error) {
      console.error('An error occured while generating ICS file.', error)
      return false
    }

    const file = new Blob([value], { type: 'text/calendar' })
    return URL.createObjectURL(file)
  })
}

const AddToCalendar = ({ eventDate, title, location }: AddToCalendarProps) => {
  const [fileData, setFileData] = useState<string | boolean>(false)
  const eventTitle = blocksToText(title)

  useEffect(() => {
    const { start: startString, end: endString } = getEventDates(eventDate)

    if (!startString) return

    const start = new Date(startString)

    let end: Date
    if (!endString) {
      /* If time is not specified add to calendar as a full day */
      end = new Date(startString)
      start.setHours(0, 0, 0)
      end.setHours(23, 59, 59)
    } else {
      end = new Date(endString)
    }

    if (isUpcoming(end)) {
      const eventData = {
        start: padMonth(toUTCDateParts(start)), // ICS lib expects start & end to be an array
        startInputType: 'utc',
        end: padMonth(toUTCDateParts(end)), // ICS lib expects start & end to be an array
        endInputType: 'utc',
        title: eventTitle,
        location: location,
      }

      setFileData(createICS(eventData))
    }
  }, [eventDate, location, eventTitle])

  if (!fileData) return null

  return (
    <Button {...(fileData && { href: fileData as string, download: `${eventTitle.replace(/ /g, '_')}.ics` })}>
      {/*  <Icon data={add} /> */}
      Add to Calendar
    </Button>
  )
}

export default AddToCalendar
