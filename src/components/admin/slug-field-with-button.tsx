'use client'

import React from 'react'
import { TextInput, useField, useAllFormFields, FieldLabel } from '@payloadcms/ui'
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

const SlugFieldWithButton: React.FC<TextFieldClientProps> = ({ field, path }) => {
  // 1. Lấy dữ liệu toàn bộ form đang nhập
  const [fields, dispatchFields] = useAllFormFields()

  // 2. Lấy thông tin field hiện tại từ useField
  const { value, setValue, showError, errorMessage } = useField<string>({ path })

  // Trích xuất label và required từ cấu hình field để truyền vào FieldLabel
  const { label, required } = field

  // 3. Hàm xử lý khi bấm nút tạo slug
  const handleGenerateSlug = (e: React.MouseEvent) => {
    e.preventDefault()

    // Lấy giá trị hiện tại của ô 'title' trong form
    const titleValue = fields['title']?.value as string

    if (titleValue) {
      const generated = slugify(titleValue)

      // Cập nhật giá trị vào form state của Payload
      setValue(generated)

      // Xóa thông báo lỗi cũ nếu có
      dispatchFields({
        type: 'UPDATE',
        path,
        valid: true,
        errorMessage: undefined,
      })
    } else {
      // Đánh dấu lỗi nếu chưa nhập title
      dispatchFields({
        type: 'UPDATE',
        path,
        valid: false,
        errorMessage: 'Vui lòng nhập Tiêu đề (Title) trước khi bấm tạo Slug!' as any,
      })
    }
  }

  return (
    <div className="field-type text">
      {/* Hiển thị chuẩn Label của Payload */}
      <FieldLabel label={label} path={path} required={required} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Hiển thị chuẩn Input của Payload */}
        <TextInput
          path={path}
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          style={{ flexGrow: 1 }}
        />

        {/* Hiển thị nút tạo Slug */}
        <button
          type="button"
          onClick={handleGenerateSlug}
          className="btn--style-secondary"
          style={{ padding: '8px 15px' }}
        >
          Tạo Slug
        </button>
      </div>

      {/* Hiển thị thông báo lỗi dưới ô input nếu có */}
      {showError && errorMessage && (
        <div
          className="error-message"
          style={{ color: 'var(--theme-error-500)', marginTop: '4px', fontSize: '12px' }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default SlugFieldWithButton
