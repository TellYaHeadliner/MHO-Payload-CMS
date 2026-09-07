// components/CustomPreviewButton.tsx
'use client'
import { Button, useDocumentInfo } from '@payloadcms/ui'

const ButtonLivePreview = () => {
  const { data, collectionSlug, globalSlug } = useDocumentInfo()

  const handleClick = () => {
    if (collectionSlug){
      return window.open(`${process.env.SERVER_URL}/${collectionSlug}/${data?.slug}?isDraft=true`)
    }
    const url = `${process.env.SERVER_URL}/${data?.slug}?isDraft=true`
    window.open(url, 'live-preview')
  }

  return (
    <Button onClick={handleClick} buttonStyle="secondary" size="medium">
      Live Preview
    </Button>
  )
}

export default ButtonLivePreview

