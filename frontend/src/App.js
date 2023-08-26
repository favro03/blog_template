import {Container} from 'react-bootstrap';
import Header from './components/Header'
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AdminRoute from './components/AdminRoute';
import AdminHomeScreen from './screens/admin/AdminHomeScreen';
import AdminPostList from './screens/admin/AdminPostList';
import AdminPostEditScreen from './screens/admin/AdminPostEditScreen'
import PostScreen from './screens/PostScreen'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/post/:id' element={<PostScreen />} />
            
              <Route path='/admin' element={<LoginScreen />} />
              <Route path='' element={<AdminRoute />}>
                <Route path='/admin/home' element={<AdminHomeScreen />} />
                <Route path='/admin/posts' element={<AdminPostList />} />
                <Route path='/admin/posts/:id/edit' element={<AdminPostEditScreen />} />
              </Route>
          </Routes>
          </Container>
        </main>
      <Footer/>

    </BrowserRouter>
  )
}

export default App
