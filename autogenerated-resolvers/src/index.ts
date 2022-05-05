import 'graphql-import-node';
import { ApolloServer } from 'apollo-server'
import { resolvers } from './resolvers.generated'
import { getDao } from './utils'
import { mergeTypeDefs } from '@graphql-tools/merge'
import inputTypeDefs from './inputs.generated.graphql'
import schemaTypeDefs from './schema.graphql'
import { typeDefs as typettaDirectivesTypeDefs } from '@twinlogix/typetta'

const server = new ApolloServer({
  typeDefs: mergeTypeDefs([inputTypeDefs, schemaTypeDefs, typettaDirectivesTypeDefs]),
  resolvers,
  context: getDao,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
