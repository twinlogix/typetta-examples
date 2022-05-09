import { ApolloServer } from 'apollo-server'
import { resolvers } from './generated/resolvers'
import { mergeTypeDefs } from '@graphql-tools/merge'
import inputTypeDefs from './generated/operations'
import schemaTypeDefs from './schema'
import { typeDefs as typettaDirectivesTypeDefs } from '@twinlogix/typetta'
import { DAOContext } from './generated/typetta'
import { v4 as uuid } from 'uuid'

export type Context = {
  entityManager: DAOContext
}

async function createContext(): Promise<Context> {
  return {
    entityManager: new DAOContext({
      scalars: {
        ID: { generate: () => uuid() },
        Date: { generate: () => new Date() },
      },
      log: true,
    }),
  }
}

const server = new ApolloServer({
  typeDefs: mergeTypeDefs([
    inputTypeDefs,
    schemaTypeDefs,
    typettaDirectivesTypeDefs,
  ]),
  resolvers,
  context: createContext,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
