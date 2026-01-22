import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

export default defineConfig({
    name: 'default',
    title: 'Ecell 2026',

    projectId: 'fkn204nu',
    dataset: 'production',

    plugins: [deskTool()],

    schema: {
        types: schemaTypes,
    },
})
