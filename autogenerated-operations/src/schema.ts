import { gql } from 'graphql-tag'

export default gql`
scalar Date

enum Permission {
  IAM_USER,
}

type User @entity @memory {
  id: ID! @id(from: "generator")
  firstName: String!
  lastName: String!
  birthDate: Date
  posts: [Post!] @foreignRef(refFrom: "userId")
  likes: [Post!]! @relationEntityRef(entity: "Like")
}

type Post @entity @memory {
  id: ID! @id(from: "generator")
  userId: ID!
  content: String!
  creationDate: Date! @default(from: "generator")
  metadata: Metadata
  likes: [User!]! @relationEntityRef(entity: "Like")
}

type Metadata {
  tags: [String!]
  views: Int
}

type Like @entity @memory {
  id: ID! @id(from: "generator")
  postId: ID!
  userId: ID!
  creationDate: Date! @default(from: "generator")
}
`