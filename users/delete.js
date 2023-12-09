const client = require('../database/connection');

const dbName = 'chat'
const collectionName = 'users'

async function deleteOne(query) {
  try {
    await client.connect();
    let result = await client.db(dbName).collection(collectionName).deleteOne(query)
    result.deletedCount === 1
      ? console.log("Deleted one document")
      : console.log("No documents deleted")
  } catch (err) {
    console.error(`Error deleting documents: ${err}`)
  } finally {
    await client.close()
  }
}

async function deleteMany(query) {
  try {
    await client.connect();
    let result = await client.db(dbName).collection(collectionName).deleteMany(query)
    result.deletedCount > 0
      ? console.log(`Deleted ${result.deletedCount} documents`)
      : console.log("No documents deleted")
  } catch (err) {
    console.error(`Error deleting documents: ${err}`)
  } finally {
    await client.close()
  }
}

module.exports = {
  deleteOne,
  deleteMany,
}
