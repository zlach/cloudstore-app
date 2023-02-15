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

function deletePostRecursive(id) {
  const i = db.findIndex(p => p.parentId === id)

  if (i > -1) {
    deletePostRecursive(db[i].id)
  }

  const index = db.findIndex(p => p.id === id)
  return db.splice(index, 1)
}

function deletePost(id) {
  const deleted = deletePostRecursive(id)

  return mockAsync(deleted)
}

function createPost(post) {
  db.unshift(post)

  return mockAsync(post)
}

export { getReplies, createPost, editPost, deletePost }
