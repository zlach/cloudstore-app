import { useState } from 'react'

function PostForm({ onSubmit }) {
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    setIsSubmitting(true)

    await onSubmit({ body })

    setBody('')

    setIsSubmitting(false)
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea rows={4} onChange={e => setBody(e.target.value)} value={body} />
      <button type="submit" disabled={isSubmitting || !body}>
        Post
      </button>
    </form>
  )
}

export default PostForm
