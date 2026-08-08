import { Block } from 'payload'

export const Marquee: Block = {
    slug: 'marquee',
    fields: [
        {
            name: 'title',
            type: 'array',
            minRows: 1,
            maxRows: 1,
            label: 'Marquee Items',
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    required: true
                },
            ]
        },
        {
            name: 'speed',
            type: 'select',
            defaultValue: 'normal',
            options: [
                { label: 'Chậm', value: 'slow' },
                { label: 'Bình thường', value: 'normal' },
                { label: 'Nhanh', value: 'fast' },
            ],
        }
    ]
}