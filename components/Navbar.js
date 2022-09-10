import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link'
import { FaSignOutAlt } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

function MainNav() {
 const router = useRouter();
  function logout(e)
  {
    e.preventDefault()
    Cookies.remove('access_token')
    Cookies.remove('user')

    router.push('/login');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand >
           <Link href="/">
             <a>
             <img src='http://tutor.publicdemo.xyz/assets/images/rocketprep-logo.png' 
             style={{maxWidth:'120px'}} 
              className='img-responsive img-fluid'/>
             </a>
           </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link href="/"> 
          <a className='nav-link'>Home</a>
           </Link>

           <Link href="/session"> 
          <a className='nav-link'>Session List</a>
           </Link>

           <Link href="/create-session"> 
          <a className='nav-link'>New Session</a>
           </Link>

           
            
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {/* <Link> */}
               <a title='Log out' onClick={(e) => {logout(e)}} href=""><span><FaSignOutAlt/> Sign out</span></a>
            {/* </Link> */}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;