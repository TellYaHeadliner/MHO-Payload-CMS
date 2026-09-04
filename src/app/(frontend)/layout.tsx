import React from 'react'
import '@/app/styles.css'
import Footer from '@/components/footer';


export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black">
        {children}
      </body>
    </html>
  )
}
