import { DAOContext } from './dao'
import { v4 as uuid } from 'uuid'

export async function getDao(): Promise<DAOContext> {
  const dao = new DAOContext({
    mongodb: {
      default: 'mock',
    },
    scalars: {
      ID: { generate: () => uuid() },
    },
    log: true,
  })

  const user1 = await dao.user.insertOne({
    record: {
      firstName: 'Mattia',
      lastName: 'Minotti',
    },
  })

  const user2 = await dao.user.insertOne({
    record: {
      firstName: 'Edoardo',
      lastName: 'Barbieri',
    },
  })
  return dao
}
