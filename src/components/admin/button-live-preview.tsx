// components/CustomPreviewButton.tsx
'use client'
import { Button, useDocumentInfo } from '@payloadcms/ui'

const ButtonLivePreview = () => {
  const { data, collectionSlug, globalSlug } = useDocumentInfo()

  const handleClick = () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${data?.slug}?isDraft=true`
    window.open(url, 'live-preview')
  }

  return (
    <Button onClick={handleClick} buttonStyle="secondary" size="medium">
      Live Preview
    </Button>
  )
}

export default ButtonLivePreview

