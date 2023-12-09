const { createOne, createMany } = require('./users/create');
const { findOne, findMany } = require('./users/find');
const { updateOne, updateMany } = require('./users/update');
const { deleteOne, deleteMany } = require('./users/delete');

(async () => {
  // Create
  const userToCreate = {
    name: 'John Doe',
  }
  await createOne(userToCreate);

  const usersToCreate = [
    {
      name: 'John Doe',
    },
    {
      name: 'Jane Doe',
    },
  ]
  await createMany(usersToCreate);

  // Find or Read
  await findOne(userToCreate);
  await findMany(userToCreate);

  // Update
  const newData = {
    name: 'Alice Doe',
  }
  await updateMany(newData, userToCreate);
  await updateOne(userToCreate, newData);

  // Delete
  await deleteOne(newData);
  await deleteMany(userToCreate);
})()
