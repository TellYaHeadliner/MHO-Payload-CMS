// components/SlugFieldWithButton.tsx
'use client'

import React from 'react'
import { TextInput, useField, useAllFormFields } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'

// Hàm chuyển đổi tiếng Việt có dấu thành slug không dấu
const slugify = (val: string): string =>
  val
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

const SlugFieldWithButton: React.FC<TextFieldClientProps> = (props) => {
  // 1. Lấy dữ liệu toàn bộ form đang nhập
   const [fields, dispatchFields] = useAllFormFields()

  // 2. Lấy helper để cập nhật giá trị cho chính ô slug này
  const { value, setValue, showError, errorMessage } = useField<string>({ path: props.path })

  // 3. Hàm xử lý khi bấm nút tạo slug
  const handleGenerateSlug = (e: React.MouseEvent) => {
    e.preventDefault() // Ngăn chặn form bị submit nhầm

    // Lấy giá trị hiện tại của ô 'title' trong form
    const titleValue = fields['title']?.value as string

    if (titleValue) {
      const generated = slugify(titleValue)
      setValue(generated) // Gán giá trị mới vào ô slug
      dispatchFields({
        type: 'UPDATE',
        path: props.path,
        valid: true,
        errorMessage: undefined,
      })
    } else {
      dispatchFields({
        type: 'UPDATE',
        path: props.path,
        valid: false,
        // Dùng ép kiểu "as any" để bỏ qua khai báo nghiêm ngặt i18n Translation Key của hệ thống
        errorMessage: 'Vui lòng nhập Tiêu đề (Title) trước khi bấm tạo Slug!' as any,
      })
    }
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Label của trường dữ liệu */}
      <label className="field-label" style={{ display: 'block', marginBottom: '5px' }}>
        {(props.field.label as string) || 'Slug'}
      </label>

      {/* Bọc input và button nằm ngang hàng */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          {/* Tái sử dụng component Input chuẩn của Payload */}
          <TextInput path={props.path} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>

        {/* Nút bấm custom nằm bên phải */}
        <button
          type="button"
          onClick={handleGenerateSlug}
          className="btn btn--style-primary btn--size-medium "
          // onMouseOver={(e) =>
          //   (e.currentTarget.style.backgroundColor = 'var(--theme-elevation-200)')
          // }
          // onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--theme-elevation-150)')}
        >
          Tạo Slug
        </button>
      </div>

    </div>
  )
}

export default SlugFieldWithButton
