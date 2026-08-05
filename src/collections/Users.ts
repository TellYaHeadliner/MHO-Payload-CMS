import { isAdmin } from '@/access/isAdmin'
import { isLoggedIn } from '@/access/isLoggedIn'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
    group: 'Quản trị',
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 ngày
    verify: false, // đổi thành true nếu muốn xác thực email khi đăng ký
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // khoá 10 phút sau khi login sai quá số lần
  },
  access: {
    read: isLoggedIn,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    admin: isLoggedIn, // ai được vào trang admin
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      access: {
        // chỉ admin mới đổi được role của người khác
        update: isAdmin,
      },
    },
  ],
}
