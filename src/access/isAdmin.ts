import { Access } from 'payload/config'

// Hàm kiểm tra người dùng có vai trò Admin hay không
export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin')
}

