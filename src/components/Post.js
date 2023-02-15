import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { createPost, getReplies, editPost, deletePost } from '../api-mock'
import { testUser } from '../constants'
import PostForm from './forms/Post'

function Post({ post, handleEdit, handleDelete }) {
  const [replies, setReplies] = useState([])
  const [replyMode, setReplyMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  useEffect(() => {
    async function fetchReplies() {
      const res = await getReplies(post.id)

      setReplies(res)
    }

    fetchReplies()
  }, [post])

  const handleCreateReply = async body => {
    const p = await createPost({
      id: uuidv4(),
      parentId: post.id,
      user: testUser,
      body: body,
      timeStamp: Date.now(),
    })

    setReplies(prevPosts => [p, ...prevPosts])
    setReplyMode(false)
    setShowReplies(true)
  }

  const handleEditPost = async body => {
    if (post.parentId === null) {
      await handleEdit(post.id, body)
    } else {
      const res = await editPost(post.id, body)

      const editedReplies = replies.map(r => {
        if (r.id === res.id) {
          r.body = res.body
          return r
        } else {
          return r
        }
      })

      setReplies(editedReplies)
    }

    setEditMode(false)
  }

  const handleDeletePost = async () => {
    if (post.parentId === null) {
      await handleDelete(post.id)
    } else {
      let filteredReplies = replies

      const res = await deletePost(post.id)

      if (res) {
        filteredReplies = replies.filter(r => r.id !== post.id)
      }

      setReplies(filteredReplies)
    }

    setDeleteMode(false)
  }

  return (
    <div className="post-component my-2">
      <div className="card p-2 bg-light">
        <div className="cardBody">
          <h2 className="card-title">{post.user}</h2>
          {editMode ? (
            <PostForm onSubmit={handleEditPost} buttonText="Edit" defaultValue={post.body} />
          ) : (
            <p className="card-text">{post.body}</p>
          )}
          {!editMode && !deleteMode && !replyMode && (
            <>
              <div className="card-link d-inline link-primary" onClick={() => setReplyMode(true)}>
                Reply
              </div>
              <div className="card-link d-inline link-primary" onClick={() => setEditMode(true)}>
                Edit
              </div>
              <div className="card-link d-inline link-primary" onClick={() => setDeleteMode(true)}>
                Delete
              </div>
            </>
          )}
          {(editMode || replyMode) && (
            <div
              className="card-link d-inline link-primary"
              onClick={() => {
                setEditMode(false)
                setReplyMode(false)
              }}
            >
              Cancel
            </div>
          )}
          {deleteMode && (
            <>
              <span className="delete-confirm">Delete?</span>
              <div className="card-link d-inline link-primary" onClick={handleDeletePost}>
                Yes
              </div>
              <div className="card-link d-inline link-primary" onClick={() => setDeleteMode(false)}>
                No
              </div>
            </>
          )}
        </div>
      </div>
      {replyMode && <PostForm onSubmit={handleCreateReply} buttonText={`Reply to ${testUser}`} />}
      {!!replies.length && !showReplies && (
        <div className="custom-link text-end link-primary" onClick={() => setShowReplies(true)}>
          View {replies.length} Replies
        </div>
      )}
      {!!replies.length && showReplies && (
        <div>
          <div className="custom-link text-end link-primary" onClick={() => setShowReplies(false)}>
            Hide Replies
          </div>
          {!!replies.length && replies.map(r => <Post handleDelete={handleDeletePost} key={r.id} post={r} />)}
        </div>
      )}
    </div>
  )
}

export default Post
