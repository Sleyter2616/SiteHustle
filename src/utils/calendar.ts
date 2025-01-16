interface CalendarEvent {
  title: string
  description: string
  startDate: string
  startTime: string
  duration?: number // in minutes
  location?: string
}

export function formatGoogleCalendarUrl({
  title,
  description,
  startDate,
  startTime,
  duration = 60,
  location = 'Online via Zoom'
}: CalendarEvent): string {
  // Convert date and time to UTC format
  const start = new Date(`${startDate} ${startTime}`)
  const end = new Date(start.getTime() + duration * 60000)

  const formatDate = (date: Date) => {
    return date
      .toISOString()
      .replace(/-|:|\.\d+/g, '')
      .slice(0, -4) + 'Z'
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location,
    dates: `${formatDate(start)}/${formatDate(end)}`
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function formatOutlookCalendarUrl({
  title,
  description,
  startDate,
  startTime,
  duration = 60,
  location = 'Online via Zoom'
}: CalendarEvent): string {
  const start = new Date(`${startDate} ${startTime}`)
  const end = new Date(start.getTime() + duration * 60000)

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: title,
    body: description,
    location,
    startdt: start.toISOString(),
    enddt: end.toISOString()
  })

  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`
}

export function generateICSContent({
  title,
  description,
  startDate,
  startTime,
  duration = 60,
  location = 'Online via Zoom'
}: CalendarEvent): string {
  const start = new Date(`${startDate} ${startTime}`)
  const end = new Date(start.getTime() + duration * 60000)

  const formatICSDate = (date: Date) => {
    return date
      .toISOString()
      .replace(/-|:|\.\d+/g, '')
      .slice(0, -4) + 'Z'
  }

  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`
}

export function downloadICSFile(event: CalendarEvent, filename: string) {
  const content = generateICSContent(event)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  
  if (typeof window !== 'undefined') {
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
