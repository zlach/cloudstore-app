import mockAsync from '../utils/mock-async'
import db from '../db-mock'

function getReplies(id) {
  return mockAsync(db.filter(post => post.parentId === id))
}

function createPost(post) {
  db.unshift(post)

  return mockAsync(post)
}

export { getReplies, createPost }
