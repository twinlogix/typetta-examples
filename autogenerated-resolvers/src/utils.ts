import { DAOContext } from './dao.generated'
import { v4 as uuid } from 'uuid'

export async function getDao(): Promise<DAOContext> {
  const dao = new DAOContext({
    scalars: {
      ID: { generate: () => uuid() },
      Date: { generate: () => new Date() }
    },
    log: async (args) => {
      console.log(args.operation, args.dao, JSON.parse(args.query ?? '{}')?.filter)
    },
  })
  return dao
}
