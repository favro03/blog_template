import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assets/logo192.png';

const Header = ({isAdmin}) => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };
  const showAdminLinks = location.pathname.startsWith('/admin');

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='Blog Logo' style={{ width: '50px', height: '50px' }} />
              Blog Name
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/categories'>
                <Nav.Link>Categories</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/about'>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/contact'>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>

             {showAdminLinks && userInfo && ( // Show "Create Post" only when admin is logged in
                <LinkContainer to='/admin/createpost'>
                  <Nav.Link>Create Post</Nav.Link>
                </LinkContainer>
              )}
              {showAdminLinks && userInfo && ( // Show "Create Post" only when admin is logged in
                <LinkContainer to='/admin/home'>
                  <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                showAdminLinks && (
                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                )
              ) : (
                showAdminLinks && (
                  <LinkContainer to='/admin'>
                    <Nav.Link>
                      <FaUser /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
