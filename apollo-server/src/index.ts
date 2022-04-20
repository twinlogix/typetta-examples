import { GraphQLResolveInfo } from 'graphql'
import { PartialDeep } from 'type-fest'
import { User } from './models'
import { typeDefs } from './schema'
import { getDao } from './utils'
import { typeDefs as directive } from '@twinlogix/typetta'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

const main = async () => {
  const dao = await getDao()
  const userId = (await dao.user.findOne())?.id
  const resolvers = {
    Query: {
      users: async (parent: never, args: never, ctx: unknown, info: GraphQLResolveInfo): Promise<PartialDeep<User>[]> => {
        return dao.user.findAll({ projection: info })
      },
    },
    Subscription: {
      users: {
        subscribe: (parent: never, args: never, ctx: unknown, info: GraphQLResolveInfo) => {
          return dao.user.liveFindAll({ projection: info }).map((v) => ({ users: v }))
        },
      },
    },
  }

  const schema = makeExecutableSchema({ typeDefs: mergeTypeDefs([typeDefs, directive]), resolvers })

  // Create an Express app and HTTP server; we will attach the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express()
  const httpServer = createServer(app)

  // Set up WebSocket server.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })
  const serverCleanup = useServer({ schema }, wsServer)

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })
  await server.start()
  server.applyMiddleware({ app })

  // Now that our HTTP server is fully set up, actually listen.
  httpServer.listen(4001, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:4001${server.graphqlPath}`)
    console.log(`🚀 Subscription endpoint ready at ws://localhost:4001${server.graphqlPath}`)
  })

  setInterval(() => {
    dao.user.updateOne({ filter: { firstName: 'Edoardo' }, changes: { birthDate: new Date() } })
  }, 1000)
  setInterval(() => {
    dao.post.insertOne({ record: { creationDate: new Date(), views: 1, userId: userId ?? '' } })
  }, 20000)
}

main()
  .then()
  .catch((error) => console.log(error))
