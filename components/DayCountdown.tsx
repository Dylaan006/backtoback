'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function DayCountdown() {
  const pathname = usePathname()
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    function updateCountdown() {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      
      const diffMs = midnight.getTime() - now.getTime()
      if (diffMs <= 0) {
        setTimeLeft('00h 00m 00s')
        return
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60))
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)

      setTimeLeft(
        `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
      )
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  if (pathname === '/login') return null

  return (
    <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-[#111] border border-[#222] py-1.5 px-3 rounded-full font-mono shadow-sm">
      <Clock size={13} className="animate-pulse text-emerald-500" />
      <span className="text-gray-400">Reinicio en:</span>
      <span className="font-semibold text-emerald-400">{timeLeft || '--h --m --s'}</span>
    </div>
  )
}
