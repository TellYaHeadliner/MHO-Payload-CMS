import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, isLoggedIn } from '../access'

// Collection lưu các submission từ form Contact trên site.
// Ai cũng được TẠO (gửi form), nhưng chỉ người login mới đọc/sửa/xoá được.
export const Contact: CollectionConfig = {
  slug: 'contact',
  labels: { singular: 'Liên hệ', plural: 'Contact' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'subject', 'status', 'createdAt'],
    group: 'Biểu mẫu',
    defaultSort: '-createdAt',
  },
  access: {
    read: isLoggedIn,
    create: () => true, // public gửi form
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Mới', value: 'new' },
        { label: 'Đang xử lý', value: 'in_progress' },
        { label: 'Đã xử lý', value: 'resolved' },
      ],
      admin: { position: 'sidebar' },
      // ẩn khỏi form public, chỉ admin panel set được
      access: { update: isAdminOrEditor },
    },
    {
      name: 'internalNote',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Ghi chú nội bộ, không hiển thị công khai',
      },
      access: { read: isLoggedIn },
    },
  ],
//   hooks: {
//     afterChange: [
//       async ({ doc, operation, req }) => {
//         if (operation === 'create') {
//           // gửi email thông báo cho admin khi có liên hệ mới
//           await req.payload.sendEmail({
//             to: process.env.CONTACT_NOTIFY_EMAIL,
//             subject: `[Liên hệ mới] ${doc.subject || doc.fullName}`,
//             text: `Từ: ${doc.fullName} <${doc.email}>\n\n${doc.message}`,
//           })
//         }
//       },
//     ],
//   },
  timestamps: true,
}