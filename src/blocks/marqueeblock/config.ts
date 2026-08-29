import { Block } from 'payload'

export const MarqueeBlock: Block = {
    slug: 'marquee',
    interfaceName: 'MaqueerBlock',
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
    ]
}