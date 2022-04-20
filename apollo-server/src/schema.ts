import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar Date
  scalar ID

  type User @entity @mongodb {
    id: ID! @id(from: "generator")
    firstName: String
    lastName: String
    birthDate: Date
    posts: [Post!]! @foreignRef(refFrom: "userId")
  }

  type Post @entity @mongodb {
    id: ID! @id(from: "generator")
    userId: ID!
    content: String
    views: Int!
    creationDate: Date!
  }

  type Query {
    users: [User!]!
  }

  type Subscription {
    users: [User!]!
  }
`
