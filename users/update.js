const client = require('../database/connection');

const dbName = 'chat'
const collectionName = 'users'

async function updateOne(query, data) {
  try {
    await client.connect();
    let result = await client.db(dbName).collection(collectionName).updateOne(query, { $set: data });
    result.modifiedCount === 1
      ? console.log("Updated one document")
      : console.log("No documents updated")
  } catch (err) {
    console.error(`Error updating document: ${err}`)
  } finally {
    await client.close()
  }
}

async function updateMany(query, data) {
  try {
    await client.connect();
    let result = await client.db(dbName).collection(collectionName).updateMany(query, { $set: data });
    result.modifiedCount > 0
      ? console.log(`Updated ${result.modifiedCount} documents`)
      : console.log("No documents updated")
  } catch (err) {
    console.error(`Error updating document: ${err}`)
  } finally {
    await client.close()
  }
}

module.exports = {
  updateOne,
  updateMany,
}
