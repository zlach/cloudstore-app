import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createPost } from '../api-mock'
import { testUser } from '../constants'
import PostForm from '../components/forms/Post'
import Post from '../components/Post'

function Home() {
  const [posts, setPosts] = useState([])

  const createNewPost = async ({ body }) => {
    const post = await createPost({
      id: uuidv4(),
      parentId: null,
      user: testUser,
      body: body,
      timeStamp: Date.now(),
    })

    setPosts(prevPosts => [post, ...prevPosts])
  }

  return (
    <div className="home-page w-75">
      <PostForm onSubmit={createNewPost} buttonText="Post" />
      {!!posts.length && posts.map(post => <Post key={post.id} parentId={null} post={post} />)}
    </div>
  )
}

export default Home
