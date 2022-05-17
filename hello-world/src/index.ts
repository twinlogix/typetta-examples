import { v4 as uuid } from 'uuid'
import { EntityManager } from './generated/typetta'

const main = async () => {
  const dao = new EntityManager({
    mongodb: {
      default: 'mock',
    },
    scalars: {
      ID: { generate: () => uuid() },
    },
    log: true,
  })

  const user1 = await dao.user.insertOne({
    record: {
      firstName: 'Mattia',
      lastName: 'Minotti',
    },
  })

  const user2 = await dao.user.insertOne({
    record: {
      firstName: 'Edoardo',
      lastName: 'Barbieri',
    },
  })

  const user3 = await dao.user.insertOne({
    record: {
      firstName: 'Bruno',
      lastName: 'Barbieri',
    },
  })

  for (let i = 0; i < 4; i++) {
    await dao.post.insertOne({ record: { creationDate: new Date(), views: i, userId: [user1, user2, user3][i % 3].id } })
  }

  const result = await dao.post.aggregate({
    by: {
      userId: true
    },
    aggregations: { views: { operation: 'sum', field: 'views' }, count: { operation: 'count' } },
  })

  const users = await dao.user.findAll()
  users.forEach((user) => console.log(`${user.firstName} ${user.lastName}`))
  console.log(result)
}

main()
  .then()
  .catch((error) => console.log(error))
