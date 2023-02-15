import { useState } from 'react'

function PostForm({ onSubmit, buttonText = 'submit' }) {
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
      <textarea className="d-block form-control" rows={2} onChange={e => setBody(e.target.value)} value={body} />
      <button className="btn btn-secondary w-100" type="submit" disabled={isSubmitting || !body}>
        {buttonText}
      </button>
    </form>
  )
}

export default PostForm
