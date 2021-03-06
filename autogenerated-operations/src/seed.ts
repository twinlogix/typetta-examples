import { Context } from '.'

export async function seedInitialData({ entityManager }: Context) {
  const u1 = await entityManager.user.insertOne({
    record: { firstName: 'Mattia', lastName: 'Minotti', id: '1' },
  })
  const u2 = await entityManager.user.insertOne({
    record: { firstName: 'Edoardo', lastName: 'Barbieri', id: '2' },
  })
  const p1 = await entityManager.post.insertOne({
    record: {
      userId: u1.id,
      content: 'Id Typetta cool?',
      metadata: { views: 1, tags: ['2'] },
    },
  })
  const p2 = await entityManager.post.insertOne({
    record: {
      userId: u1.id,
      content: 'Graphql Security',
      metadata: { views: 2, tags: ['4'] },
    },
  })
  const p3 = await entityManager.post.insertOne({
    record: {
      userId: u1.id,
      content: 'Graphql federation',
      metadata: {
        tags: ['1', '2', '3'],
      },
    },
  })
  const p4 = await entityManager.post.insertOne({
    record: {
      userId: u1.id,
      content: 'Graphql',
      metadata: { views: 3 },
    },
  })
  await entityManager.like.insertOne({
    record: { postId: p1.id, userId: u2.id },
  })
  await entityManager.like.insertOne({
    record: { postId: p2.id, userId: u2.id },
  })
  await entityManager.like.insertOne({
    record: { postId: p3.id, userId: u2.id },
  })
  await entityManager.like.insertOne({
    record: { postId: p4.id, userId: u2.id },
  })
  await entityManager.like.insertOne({
    record: { postId: p4.id, userId: u1.id },
  })
}
