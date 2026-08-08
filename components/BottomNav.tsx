'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ListTodo, CalendarCheck, Wallet, Flame } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Tasks', href: '/tasks', icon: ListTodo },
  { name: 'Habits', href: '/habits', icon: CalendarCheck },
  { name: 'Economy', href: '/economy', icon: Wallet },
  { name: 'Kcal', href: '/kcal', icon: Flame },
]

export function BottomNav() {
  const pathname = usePathname()

  // Hide nav on login page
  if (pathname === '/login') return null

  return (
    <nav className="fixed bottom-0 w-full bg-[#111] border-t border-[#333] pb-[env(safe-area-inset-bottom)] z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-emerald-500" : "text-gray-400 hover:text-gray-200"
              )}
            >
              <Icon size={24} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
