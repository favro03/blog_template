import {Container} from 'react-bootstrap';
import Header from './components/Header'
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AdminRoute from './components/AdminRoute';
import AdminHomeScreen from './screens/admin/AdminHomeScreen';
import AdminCreatePost from './screens/admin/AdminCreatePost';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
            
              <Route path='/admin' element={<LoginScreen />} />
              <Route path='' element={<AdminRoute />}>
                <Route path='/admin/home' element={<AdminHomeScreen />} />
                <Route path='/admin/createpost' element={<AdminCreatePost />} />
              </Route>
          </Routes>
          </Container>
        </main>
      <Footer/>

    </BrowserRouter>
  )
}

export default App
