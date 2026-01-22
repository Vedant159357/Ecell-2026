export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
        },
        {
            name: 'siteDescription',
            title: 'Site Description (SEO)',
            type: 'text',
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: { hotspot: true }
        },
        {
            title: 'Hero Section',
            name: 'hero',
            type: 'object',
            fields: [
                { name: 'tagline', title: 'Tagline', type: 'string' },
                { name: 'title', title: 'Hero Title', type: 'string' },
                { name: 'subtitle', title: 'Hero Subtitle', type: 'string' },
                { name: 'description', title: 'Hero Description', type: 'text' },
                { name: 'backgroundImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } },
            ]
        },
        {
            title: 'About Section',
            name: 'about',
            type: 'object',
            fields: [
                { name: 'mission', title: 'Our Mission', type: 'string' },
                { name: 'description', title: 'About Description', type: 'text' },
                {
                    name: 'features',
                    title: 'Key Features / Cards',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', title: 'Title', type: 'string' },
                                { name: 'description', title: 'Description', type: 'text' }
                            ]
                        }
                    ]
                },
                {
                    name: 'stats',
                    title: 'Statistics',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', title: 'Label', type: 'string' },
                                { name: 'value', title: 'Value (Number)', type: 'number' },
                                { name: 'suffix', title: 'Suffix (e.g. +)', type: 'string' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'Contact Information',
            name: 'contact',
            type: 'object',
            fields: [
                { name: 'email', title: 'Email Address', type: 'string' },
                { name: 'phone', title: 'Phone Number', type: 'string' },
                { name: 'address', title: 'Office Address', type: 'text' },
                { name: 'googleMapsLink', title: 'Google Maps Link', type: 'url' },
            ]
        },
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', title: 'Platform Name', type: 'string', description: 'e.g. LinkedIn, Instagram, Twitter' },
                        { name: 'url', title: 'URL', type: 'url' }
                    ]
                }
            ]
        },
    ]
}
