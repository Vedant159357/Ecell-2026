export default {
    name: 'teamMember',
    title: 'Team Member',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'position',
            title: 'Position',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Faculty', value: 'faculty' },
                    { title: 'Core Team', value: 'coreTeam' }
                ],
            },
            validation: Rule => Rule.required()
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
            name: 'linkedin',
            title: 'LinkedIn URL',
            type: 'url',
        },
        {
            name: 'hierarchy',
            title: 'Hierarchy',
            type: 'string',
            description: 'Used for ordering (e.g., president, vicePresident, etc.)'
        }
    ]
}
