'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SidebarNav } from '@/components/vault/sidebar-nav'
import { TopBar } from '@/components/vault/top-bar'
import { TestModeBanner } from '@/components/vault/test-mode-banner'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transition-transform duration-300 ease-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4">
          <SidebarNav />
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-card/80 backdrop-blur-md px-4 sm:px-6">
          <TopBar onToggleSidebar={() => setSidebarOpen(true)} />
        </header>

        {/* Test mode banner */}
        <div className="px-4 sm:px-6 lg:px-8 pt-4">
          <TestModeBanner />
        </div>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
