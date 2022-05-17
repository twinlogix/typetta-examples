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
    log: async (args) => {
      console.log(args.operation, args.dao, JSON.parse(args.query ?? '{}')?.filter)
    },
  })

  await dao.user.insertOne({
    record: {
      firstName: 'Mattia',
      lastName: 'Minotti',
    },
  })

  await dao.user.insertOne({
    record: {
      firstName: 'Edoardo',
      lastName: 'Barbieri',
    },
  })
  return dao
}
