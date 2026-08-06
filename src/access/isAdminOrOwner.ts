import { Access } from 'payload'

export const isAdminOrOwner: Access = ({ req: { user } }) => {
  // 1. Nếu chưa đăng nhập -> Từ chối truy cập
  if (!user) return false

  // 2. Nếu là Admin -> Cho phép truy cập toàn bộ
  if (user.role === 'admin') return true

  // 3. Nếu là người dùng thường -> Trả về truy vấn lọc (Where Query)
  // Chỉ truy cập vào tài liệu có trường 'author' trùng với ID của user hiện tại
  return {
    author: {
      equals: user.id,
    },
  }
}