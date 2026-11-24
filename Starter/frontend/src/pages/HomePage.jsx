import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard.jsx'

// TODO (student): Fetch all posts from the backend and render them.
function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/api/posts") // fetch makes the GET request
    // Checking if res not ok, throw error
    .then((res) => {
      if (!res.ok) {
        throw new Error ("Could not fetch posts.")
      }
      // if ok, return
      return res.json()
    })
      // then return posts in javascript
    .then((json) => {
      setPosts(json)
    })
    .catch((err) => {
      setError(err.message)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="status-msg">Loading posts…</p>
  if (error) return <p className="status-msg error">{error}</p>

  return (
    <div className="blog-page">
      <div className="page-heading">
        <p className="eyebrow">Blog</p>
        <h1 className="page-title">All posts</h1>
        <p className="page-copy">
          Browse all our latest blog posts.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="status-msg">No posts yet. Implement fetch logic in HomePage first.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage
