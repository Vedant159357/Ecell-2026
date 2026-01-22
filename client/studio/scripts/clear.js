const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'fkn204nu',
    dataset: 'production',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
    apiVersion: '2024-03-21',
});

async function clearData() {
    const types = ['event', 'teamMember', 'sponsor', 'guest', 'alumni', 'siteSettings', 'gallery'];
    console.log(`🧹 Clearing all Sanity data for types: ${types.join(', ')}...`);

    try {
        for (const type of types) {
            const query = `*[_type == "${type}"]`;
            const docs = await client.fetch(query);
            console.log(`Found ${docs.length} documents of type ${type}`);

            for (const doc of docs) {
                await client.delete(doc._id);
                console.log(`Deleted ${doc._id}`);
            }
        }
        console.log('✨ Sanity cleared! Ready for fresh migration.');
    } catch (err) {
        console.error('❌ Error clearing data:', err.message);
    }
}

clearData();
