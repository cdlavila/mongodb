const client = require('../database/connection');

const dbName = 'chat'
const collectionName = 'users'

async function findOne(query) {
  try {
    await client.connect();
    let result = await client.db(dbName).collection(collectionName).findOne(query);
    console.log(result)
  } catch (err) {
    console.error(`Error finding document: ${err}`)
  } finally {
    await client.close()
  }
}

async function findMany(query) {
  try {
    await client.connect();
    let result = await client.db(dbName).collection(collectionName).find(query);
    await result.forEach((doc) => console.log(doc))
  } catch (err) {
    console.error(`Error finding document: ${err}`)
  } finally {
    await client.close()
  }
}

module.exports = {
  findOne,
  findMany,
}
