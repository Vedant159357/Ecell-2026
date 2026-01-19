export default {
    name: 'alumni',
    title: 'Alumni',
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
            name: 'company',
            title: 'Company',
            type: 'string',
        },
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
        },
        {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'journey',
            title: 'Journey',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'year', title: 'Year', type: 'string' },
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'desc', title: 'Description', type: 'text' }
                    ]
                }
            ]
        },
        {
            name: 'linkedin',
            title: 'LinkedIn URL',
            type: 'url',
        },
        {
            name: 'email',
            title: 'Contact Email',
            type: 'string',
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
        },
        {
            name: 'color',
            title: 'Theme Color (Gradient)',
            type: 'string',
            description: 'e.g., from-[#434343] to-[#000000]'
        }
    ]
}
