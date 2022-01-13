import { DAOContext } from './dao';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { v4 as uuid } from 'uuid';
import { identityAdapter } from '@twinlogix/typetta';

const main = async () => {

  const mongoServer = await MongoMemoryServer.create();
  const mongoConnection = await MongoClient.connect(mongoServer.getUri());
  const mongoDb = mongoConnection.db('example-db');

  const daoContext = new DAOContext({
    mongo: {
      default: mongoDb
    },
    scalars: {
      ID: { ...identityAdapter, generate: () => uuid() },
      Date: identityAdapter
    }
  });

  const user1 = await daoContext.user.insertOne({
    record: {
      firstName: "Mattia",
      lastName: "Minotti"
    }
  });

  const user2 = await daoContext.user.insertOne({
    record: {
      firstName: "Edoardo",
      lastName: "Barbieri"
    }
  });

  const users = await daoContext.user.findAll();
  users.forEach(user => console.log(`${user.firstName} ${user.lastName}`));

};

main()
  .then()
  .catch((error) => console.log(error));


