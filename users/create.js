const client = require('../database/connection');

const dbName = 'chat'
const collectionName = 'users'

async function createOne(data) {
  try {
    await client.connect();
    let result = await client.db(dbName).collection(collectionName).insertOne(data);
    console.log(`Inserted document: ${result.insertedId}`)
  } catch (err) {
    console.error(`Error inserting document: ${err}`)
  } finally {
    await client.close()
  }
}

async function createMany(data) {
  try {
    await client.connect();
    let result = await client.db(dbName).collection(collectionName).insertMany(data);
    console.log(`Inserted ${result.insertedCount} documents`)
    console.log(result)
  } catch (err) {
    console.error(`Error inserting document: ${err}`)
  } finally {
    await client.close()
  }
}

module.exports = {
  createOne,
  createMany,
}
