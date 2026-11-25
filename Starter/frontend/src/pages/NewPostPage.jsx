import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

// TODO (student): Implement create flow (POST /api/posts).t
function NewPostPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    // Forms information
    try {
      const formData = new FormData(e.target)
      // Change into JavaScript object
      const data = Object.fromEntries(formData)

      const res = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
      })
      // If the answer doesn't work
        if (!res.ok) {
        throw new Error('Could not create post.')
      }

    // New post's id
      const createdPost = await res.json()

    // Navigate to the new post
      navigate(`/posts/${createdPost._id}`)
     
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false) }}

  return (
    <div>
      <h1 className="page-title">New post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  )
}

export default NewPostPage
