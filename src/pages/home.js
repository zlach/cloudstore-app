import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createPost, editPost, deletePost } from '../api-mock'
import { testUser } from '../constants'
import PostForm from '../components/forms/Post'
import Post from '../components/Post'

import db from '../db-mock'

function Home() {
  const [posts, setPosts] = useState([])

  const handleCreatePost = async body => {
    const post = await createPost({
      id: uuidv4(),
      parentId: null,
      user: testUser,
      body: body,
      createdAt: new Date().toISOString(),
    })

    setPosts(prevPosts => [post, ...prevPosts])
  }

  const handleEditPost = async (id, body) => {
    const res = await editPost(id, body)

    const editedPosts = posts.map(p => {
      if (p.id === res.id) {
        p.body = res.body
        return p
      } else {
        return p
      }
    })

    setPosts(editedPosts)
  }

  const handleDeletePost = async id => {
    let filteredPosts = posts
    const res = await deletePost(id)

    if (res) {
      filteredPosts = posts.filter(p => p.id !== id)
    }

    setPosts(filteredPosts)
  }

  return (
    <div className="home-page w-75">
      <PostForm onSubmit={handleCreatePost} buttonText="Post" />
      {!!posts.length &&
        posts.map(post => (
          <Post handleEdit={handleEditPost} handleDelete={handleDeletePost} key={post.id} post={post} />
        ))}
    </div>
  )
}

export default Home
