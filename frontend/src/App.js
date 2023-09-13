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
import CategoryScreen from './screens/CategoryScreen';
import AboutScreen from './screens/AboutScreen';
import ContactPageScreen from './screens/ContactPageScreen';
import AdminPostCreateScreen from './screens/admin/AdminPostCreateScreen'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/post/:id' element={<PostScreen />} />
              <Route path='/category/:category' element={<CategoryScreen />} />
              <Route path='/about' element={<AboutScreen />} />
              <Route path='/contact' element={<ContactPageScreen />} />
              <Route path='/admin' element={<LoginScreen />} />
              <Route path='' element={<AdminRoute />}>
                <Route path='/admin/home' element={<AdminHomeScreen />} />
                <Route path='/admin/posts' element={<AdminPostList />} />
                <Route path='/admin/posts/:id/edit' element={<AdminPostEditScreen />} />
                <Route path='/admin/createnew' element={<AdminPostCreateScreen />} />
              </Route>
          </Routes>
          </Container>
        </main>
      <Footer/>

    </BrowserRouter>
  )
}

export default App
