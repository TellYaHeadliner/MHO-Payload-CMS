import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const Header: GlobalConfig = {
    slug: 'header',
    admin: {
        group: 'Phần site website',
    },
    access: {
        read: () => true,
        update: ({ req: { user } }) => Boolean(user),
    },
    fields: [
        {
            name: 'logo',
            type: 'group',
            label: 'Logo',
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    label: 'Phần chữ thường (vd: myhealing)',
                    required: true,
                    defaultValue: 'myhealing',
                },
                {
                    name: 'highlightText',
                    type: 'text',
                    label: 'Phần chữ in nghiêng (vd: osh)',
                    required: true,
                    defaultValue: 'osh',
                },
                {
                    name: 'href',
                    type: 'text',
                    label: 'Link khi bấm logo',
                    defaultValue: '/',
                },
            ],
        },
        {
            type: 'collapsible',
            label: 'Social Links',
            admin: { initCollapsed: false },
            fields: [
                {
                    name: 'socialLinks',
                    type: 'array',
                    labels: { singular: 'Social Link', plural: 'Social Links' },
                    fields: [
                        {
                            name: 'platform',
                            type: 'select',
                            required: true,
                            options: [
                                { label: 'Facebook', value: 'facebook' },
                                { label: 'Instagram', value: 'instagram' },
                            ],
                        },
                        {
                            name: 'url',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            type: 'collapsible',
            label: 'Menu Gallery (bên phải header)',
            admin: {
                description:
                    'Tối đa 7 mục, hiển thị dàn trải trực tiếp trên header ở PC. Trên mobile sẽ gộp vào menu hamburger. Chọn bài từ collection Gallery, URL/label sẽ tự lấy theo slug/title của bài đó.',
            },
            fields: [
                {
                    name: 'galleryItem',
                    type: 'relationship',
                    relationTo: 'gallery',
                    required: true,
                    label: 'Bài Gallery',
                    maxRows: 7,
                    hasMany: true,
                    // Chỉ cho chọn những bài đã publish để tránh header trỏ tới draft chưa public
                    filterOptions: {
                        _status: {
                            equals: 'published',
                        },
                    },
                },
            ],
        },
    ],
    hooks: {
        afterChange: [
            async () => {
                // 'max' = stale-while-revalidate: trả về bản cache cũ ngay lập tức,
                // đồng thời fetch bản mới ở nền cho lần truy cập tiếp theo.
                revalidateTag('global_header', 'max')
            },
        ],
    },
}

export default Header