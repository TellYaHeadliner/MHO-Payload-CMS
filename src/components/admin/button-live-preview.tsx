// components/CustomPreviewButton.tsx
'use client'
import { Button, useDocumentInfo } from '@payloadcms/ui'

const ButtonLivePreview = () => {
  const { data, collectionSlug } = useDocumentInfo()

  const handleClick = () => {
    if (collectionSlug === 'blog'){
      return window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${data?.slug}?isDraft=true`)
    }
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

