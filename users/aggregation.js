const client = require('../database/connection');

// Transactions work as the same way as in SQL databases
(async () => {
  const dbName = 'chat'
  const collectionName = 'users'
  try {
    await client.connect();

    const pipeline = [
      {
        $match: {
          name: { $ne: 'John Doe' }
        }
      },
      {
        $group: {
          _id: '$name',
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      {
        $limit: 10
      },
      // It just an example of $project usage, before this, we were getting the _id and count fields
      {
        $project: {
          _id: 1,
          count: 1,
          example: 'test'
        }
      }
    ]

    let result = await client.db(dbName).collection(collectionName).aggregate(pipeline);

    for await (const doc of result) {
      console.log(doc);
    }
  } catch {
    console.log('The transaction was aborted due to an unexpected error: ' + e);
  } finally {
    await client.close();
  }
})()

// OUTPUT
// { _id: 'Carlos Daniel Londoño', count: 1 }
// { _id: 'Samuel', count: 1 }
// { _id: 'Jane Doe', count: 11 }
// { _id: 'Alice Doe', count: 1 }

