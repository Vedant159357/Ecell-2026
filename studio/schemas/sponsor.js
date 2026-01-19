export default {
    name: 'sponsor',
    title: 'Sponsor',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Category / Tier',
            type: 'string',
            options: {
                list: [
                    { title: 'Gold', value: 'gold' },
                    { title: 'Silver', value: 'silver' },
                    { title: 'Bronze', value: 'bronze' },
                    { title: 'Partner', value: 'partner' },
                ],
            },
        },
        {
            name: 'logo',
            title: 'Sponsor Logo',
            type: 'image',
            options: { hotspot: true }
        }
    ]
}
