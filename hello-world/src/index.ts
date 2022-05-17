import { v4 as uuid } from 'uuid'
import { EntityManager } from './generated/typetta'

const main = async () => {
  const entityManager = new EntityManager({
    mongodb: {
      default: 'mock',
    },
    scalars: {
      ID: { generate: () => uuid() },
    },
    log: true,
  })

  const user1 = await entityManager.user.insertOne({
    record: {
      firstName: 'Mattia',
      lastName: 'Minotti',
    },
  })

  const user2 = await entityManager.user.insertOne({
    record: {
      firstName: 'Edoardo',
      lastName: 'Barbieri',
    },
  })

  const user3 = await entityManager.user.insertOne({
    record: {
      firstName: 'Bruno',
      lastName: 'Barbieri',
    },
  })

  for (let i = 0; i < 4; i++) {
    await entityManager.post.insertOne({ record: { creationDate: new Date(), views: i, userId: [user1, user2, user3][i % 3].id } })
  }

  const result = await entityManager.post.aggregate({
    by: {
      userId: true
    },
    aggregations: { views: { operation: 'sum', field: 'views' }, count: { operation: 'count' } },
  })

  const users = await entityManager.user.findAll()
  users.forEach((user) => console.log(`${user.firstName} ${user.lastName}`))
  console.log(result)
}

main()
  .then()
  .catch((error) => console.log(error))
