'use client'

import { useAuth, useRouteTransition, Button } from '@payloadcms/ui'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const AccountLogout = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { logOut } = useAuth()
  const { startRouteTransition } = useRouteTransition()
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (pathname !== '/admin/account') {
      setContainer(null)
      return
    }

    const settings = document.querySelector('.payload-settings')
    if (!settings) return

    const section = document.createElement('section')
    section.className = 'account-logout-section payload-settings'
    settings.insertAdjacentElement('afterend', section)
    setContainer(section)

    return () => {
      section.remove()
      setContainer(null)
    }
  }, [pathname])

  if (!container) return null

  const handleLogout = async () => {
    await logOut()
    startRouteTransition(() => router.push('/admin/login'))
  }

  return createPortal(
    <>
      <h3>Đăng xuất</h3>
      <div>
        <Button onClick={handleLogout} className="btn btn--icon-style-without-border btn--size-medium btn--withoutPopup btn--style-secondary btn--withoutPopup">
            Đăng xuất
        </Button>
      </div>
    </>,
    container,
  )
}

export default AccountLogout
