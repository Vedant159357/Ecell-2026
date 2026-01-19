export default {
    name: 'guest',
    title: 'Guest',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'role',
            title: 'Role',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'linkedin',
            title: 'LinkedIn URL',
            type: 'url',
        },
        {
            name: 'instagram',
            title: 'Instagram URL',
            type: 'url',
        }
    ]
}
