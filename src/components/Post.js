import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { createPost, getReplies } from '../api-mock'
import { testUser } from '../constants'
import db from '../db-mock'
import PostForm from './forms/Post'

function Post({ post, parentId }) {
  const [replies, setReplies] = useState([])
  const [replyMode, setReplyMode] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  useEffect(() => {
    async function fetchReplies() {
      const res = await getReplies(post.id)

      setReplies(res)
    }

    fetchReplies()
  }, [post])

  const createReply = async ({ body }) => {
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

  return (
    <div className="post-component my-2">
      <div className="card p-2 bg-light">
        <div className="cardBody">
          <h2 className="card-title">{post.user}</h2>
          <p className="card-text">{post.body}</p>
          <div className="card-link d-inline link-primary" onClick={() => setReplyMode(true)}>
            Reply
          </div>
          <div className="card-link d-inline link-primary">Edit</div>
          <div className="card-link d-inline link-primary">Delete</div>
        </div>
      </div>
      {replyMode && <PostForm onSubmit={createReply} buttonText={`Reply to ${testUser}`} />}
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
          {!!replies.length && replies.map(r => <Post key={r.id} parentId={post.id} post={r} />)}
        </div>
      )}
    </div>
  )
}

export default Post
