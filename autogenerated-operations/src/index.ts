import { ApolloServer } from 'apollo-server'
import { resolvers } from './generated/resolvers'
import { mergeTypeDefs } from '@graphql-tools/merge'
import inputTypeDefs from './generated/operations'
import schemaTypeDefs from './schema'
import { typeDefs as typettaDirectivesTypeDefs } from '@twinlogix/typetta'
import { EntityManager } from './generated/typetta'
import { v4 as uuid } from 'uuid'
import { seedInitialData } from './seed'

export type Context = {
  entityManager: EntityManager
}

async function createContext(): Promise<Context> {
  return {
    entityManager: new EntityManager({
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

createContext().then((context) => {
  seedInitialData(context).then(() => {
    console.log('Seed completed')
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
  })
})
