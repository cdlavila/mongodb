const client = require('../database/connection');

// Transactions work as the same way as in SQL databases
(async () => {
  const dbName = 'chat'
  const collectionName = 'users'
  const session = client.startSession();
  try {
    const transactionResults = await session.withTransaction(async () => {
      const users = await client.db(dbName).collection(collectionName).find({}).toArray();
      console.log(users);
      const result = await client.db(dbName).collection(collectionName).insertOne({ name: 'John Doe' });
      console.log(result);
      return result;
    })

    if (transactionResults) {
      console.log('The transaction was successfully committed');
    } else {
      console.log('Transaction failed')
    }
  } catch (e) {
    console.log('The transaction was aborted due to an unexpected error: ' + e);
  } finally {
    await session.endSession();
    await client.close();
  }
})()
