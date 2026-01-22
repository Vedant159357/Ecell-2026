export default {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
        },
        {
            name: 'highlight',
            title: 'Highlight',
            type: 'string',
        },
        {
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
        },
        {
            name: 'date',
            title: 'Date',
            type: 'string',
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'fullDescription',
            title: 'Full Description',
            type: 'array',
            of: [{ type: 'text' }]
        },
        {
            name: 'objectives',
            title: 'Objectives',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'stats',
            title: 'Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'value', title: 'Value', type: 'string' }
                    ]
                }
            ]
        },
        {
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image' }]
        },
        {
            name: 'organizers',
            title: 'Organizers',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'sponsors',
            title: 'Sponsors',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Used for manual sorting of events'
        }
    ],
}
