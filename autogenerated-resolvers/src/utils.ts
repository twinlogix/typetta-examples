import { DAOContext } from './dao.generated'
import { v4 as uuid } from 'uuid'

export type ExampleDAOContext = DAOContext
export async function getDao(): Promise<ExampleDAOContext> {
  const dao = new DAOContext({
    scalars: {
      ID: { generate: () => uuid() },
      Date: { generate: () => new Date() },
    },
    log: async (args) => {
      console.log(args.operation, args.dao, JSON.parse(args.query ?? '{}')?.filter, JSON.parse(args.query ?? '{}')?.sorts)
    },
  })
  return dao
}
