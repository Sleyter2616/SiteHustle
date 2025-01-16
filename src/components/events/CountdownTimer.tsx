'use client'

import { useEffect, useState } from 'react'

interface CountdownProps {
  targetDate: string
  targetTime: string
}

export default function CountdownTimer({ targetDate, targetTime }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
  } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(`${targetDate} ${targetTime}`)
      const now = new Date()
      const difference = target.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft(null)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

      setTimeLeft({ days, hours, minutes })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [targetDate, targetTime])

  if (!timeLeft) return null

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24

  return (
    <div className={`mt-4 text-sm ${isUrgent ? 'text-[#FF6B6B]' : 'text-[#94A3B8]'}`}>
      {isUrgent ? (
        <div className="animate-pulse">
          Starting in{' '}
          {timeLeft.hours > 0 ? `${timeLeft.hours}h ` : ''}
          {timeLeft.minutes}m
        </div>
      ) : (
        <div>
          Starting in{' '}
          {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}
          {timeLeft.hours}h
        </div>
      )}
    </div>
  )
}
