import mockAsync from '../utils/mock-async'
import db from '../db-mock'

function getReplies(id) {
  return mockAsync(db.filter(post => post.parentId === id))
}

function editPost(id, body) {
  const i = db.findIndex(p => p.id === id)

  db[i].body = body

  return mockAsync(db[i])
}

function deletePost(id) {
  const i = db.findIndex(p => p.id === id)

  return mockAsync(db.splice(i, 1))
}

function createPost(post) {
  db.unshift(post)

  return mockAsync(post)
}

export { getReplies, createPost, editPost, deletePost }
