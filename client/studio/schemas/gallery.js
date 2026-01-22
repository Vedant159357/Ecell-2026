export default {
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }]
        }
    ]
}
