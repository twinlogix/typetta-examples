import { ApolloServer } from 'apollo-server'
import { resolvers } from './generated/resolvers'
import { mergeTypeDefs } from '@graphql-tools/merge'
import inputTypeDefs from './generated/operations'
import schemaTypeDefs from './schema'
import {
  PERMISSION,
  typeDefs as typettaDirectivesTypeDefs,
} from '@twinlogix/typetta'
import { EntityManager } from './generated/typetta'
import { v4 as uuid } from 'uuid'
import { seedInitialData } from './seed'
import { Permission } from './generated/model.types'

export type Context = {
  entityManager: EntityManager<
    never,
    { securityDomain: OperationSecurityDomain },
    Permission,
    SecurityDomain
  >
}
type SecurityDomain = { userId?: string }
type OperationSecurityDomain = {
  [K in keyof SecurityDomain]: SecurityDomain[K][]
}

async function createContext(
  secure: boolean,
  userIds?: string,
): Promise<Context> {
  return {
    entityManager: new EntityManager<
      never,
      { securityDomain: OperationSecurityDomain },
      Permission,
      SecurityDomain
    >({
      scalars: {
        ID: { generate: () => uuid() },
        Date: { generate: () => new Date() },
      },
      log: true,
      security: {
        applySecurity: secure,
        defaultPermission: PERMISSION.DENY,
        policies: {
          user: {
            domain: {
              userId: 'id',
            },
            permissions: {
              IAM_USER: PERMISSION.ALLOW,
            },
            defaultPermissions: {
              read: {
                id: true,
                firstName: true,
                lastName: true,
                posts: true,
              },
            },
          },
          post: {
            domain: {
              userId: 'userId',
            },
            permissions: {
              IAM_USER: PERMISSION.ALLOW,
            },
            defaultPermissions: {
              read: {
                id: true,
                userId: true,
                creationDate: true,
                likes: true,
              },
            },
          },
          like: {
            domain: {
              userId: 'userId',
            },
            permissions: {
              IAM_USER: PERMISSION.ALLOW,
            },
            defaultPermissions: PERMISSION.READ_ONLY,
          },
        },
        context: { permissions: { IAM_USER: [{ userId: '1' }] } },
        operationDomain: () => {
          return userIds ? { userId: userIds.split(',') } : undefined
        },
      },
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
  context: (event: any) => createContext(true, event.req?.headers?.users),
})

createContext(false).then((context) => {
  seedInitialData(context).then(() => {
    console.log('Seed completed')
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
  })
})
