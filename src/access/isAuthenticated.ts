import { Access } from 'payload/config'

export const isAuthenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}