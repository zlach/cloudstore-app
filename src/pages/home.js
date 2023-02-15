import { useState } from 'react'
import { createPost } from '../api-mock'
import { testUser } from '../constants'
import PostForm from '../components/forms/Post'
import Post from '../components/Post'

function Home() {
  const [posts, setPosts] = useState([])

  const createNewPost = async data => {
    const { body } = data

    const post = await createPost({
      user: testUser,
      body: body,
      timeStamp: Date.now(),
    })

    setPosts(prevPosts => [...prevPosts, post])
  }

  return (
    <div>
      <PostForm onSubmit={createNewPost} />
      {posts && posts.map(post => <Post post={post} />)}
    </div>
  )
}

export default Home
