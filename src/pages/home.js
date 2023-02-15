import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createPost } from '../api-mock'
import { testUser } from '../constants'
import PostForm from '../components/forms/Post'
import Post from '../components/Post'

function Home() {
  const [posts, setPosts] = useState([])

  const handleCreatePost = async ({ body }) => {
    const post = await createPost({
      id: uuidv4(),
      parentId: null,
      user: testUser,
      body: body,
      createdAt: new Date.now().toISOString(),
    })

    setPosts(prevPosts => [post, ...prevPosts])
  }

  return (
    <div className="home-page w-75">
      <PostForm onSubmit={handleCreatePost} buttonText="Post" />
      {!!posts.length && posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  )
}

export default Home
