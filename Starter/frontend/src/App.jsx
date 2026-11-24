import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import LandingPage from './pages/LandingPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import PostPage from './pages/PostPage.jsx'
import NewPostPage from './pages/NewPostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// TODO: Complete and verify the route map.
// They all work, yay!

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/"               element={<LandingPage />} />
          <Route path="/about"          element={<AboutPage />} />
          <Route path="/contact"        element={<ContactPage />} />
          <Route path="/blog"           element={<HomePage />} />
          <Route path="/posts/new"      element={<NewPostPage />} /> {/*Create*/}
          <Route path="/posts/:id"      element={<PostPage />} /> {/*Read*/}
          <Route path="/posts/:id/edit" element={<EditPostPage />} /> {/*Update*/}
          <Route path="*"               element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
