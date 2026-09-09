import type { Block } from 'payload'

export const PostListBlock: Block = {
  slug: 'postlistblock',
  labels: {
    singular: 'Post Block',
    plural: 'Post Blocks',
  },
  admin: {
    disableBlockName: true, // ẩn ô "blockName" và chữ Untitled đi kèm
  },
  interfaceName: 'PostListBlock',
  fields: [
    {
      name: 'labelNameofList',
      label: 'Tên danh sách của bài viết',
      type: 'text',
      required: true
    },
    {
      name: 'selectedArticles',
      type: 'relationship',
      maxRows: 3,
      relationTo: 'blog',
      hasMany: true,
      label: 'Bài viết (chọn từ collection Blog)',
    },
  ],
}