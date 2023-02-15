import mockAsync from '../utils/mock-async'
import db from '../db-mock'

function getPosts(parent = null) {
  return mockAsync(db)
}

function createPost(post) {
  db.push(post)

  return post
}

export { getPosts, createPost }
