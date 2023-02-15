import { useEffect, useState } from 'react'

function PostForm({ onSubmit, buttonText = 'submit', defaultValue = '' }) {
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setBody(defaultValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    setIsSubmitting(true)

    await onSubmit({ body })

    setBody('')

    setIsSubmitting(false)
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        className="d-block form-control"
        rows={2}
        defaultValue={defaultValue}
        onChange={e => setBody(e.target.value)}
        value={body}
      />
      <button className="btn btn-secondary w-100" type="submit" disabled={isSubmitting || !body}>
        {buttonText}
      </button>
    </form>
  )
}

export default PostForm
