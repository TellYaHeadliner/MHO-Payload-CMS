// src/components/CustomLogoutButton/index.tsx
'use client'

import { useAuth, useRouteTransition } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Logout: React.FC = () => {
  const { logOut } = useAuth()
  const router = useRouter()
  const { startRouteTransition } = useRouteTransition()

  const handleLogout = async () => {
    await logOut()
    startRouteTransition(() => router.push('/admin/login'))
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="btn btn--style-primary" // dùng class sẵn có của Payload cho đồng bộ giao diện
    >
      Đăng xuất
    </button>
  )
}

export default Logout