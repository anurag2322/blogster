import './App.css'
import {Routes, Route} from 'react-router-dom'
import Header from './Header'
import Post from './Posts'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider } from './UserContext'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/create' element={<CreatePost/>} />
            <Route path='/post/:id' element={<PostPage/>} />
        </Route>

      </Routes>
    </UserContextProvider>

  )
}

