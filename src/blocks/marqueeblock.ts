import { Block } from 'payload'

export const MarqueeBlock: Block = {
    slug: 'marquee',
    fields: [
        {
            name: 'title',
            type: 'array',
            minRows: 3,
            maxRows: 9,
            defaultValue: [
                { text: '' },
                { text: '' },
                { text: '' },
            ],
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