import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link'
import { FaSignOutAlt , FaAlignRight , FaBell } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AuthContext from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { getUnreadNotificationCount } from "../util/common_api";
import { useState } from 'react';
function MainNav() {
 const router = useRouter();
 const auth = useContext(AuthContext);
 const [notificationCounter , setNotificationCounter ] = useState(0);
  
   useEffect(() => {
    getNotification();
   },[])

   function getNotification()
   {
      getUnreadNotificationCount().then(response => {
          setNotificationCounter(response.data.data.total_unread_notifications);
      })
   }
   
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
            <DropdownButton id="dropdown-basic-button" variant="outline-success" title={auth.user.name}>
                          <Dropdown.Item >
                          {/* <a title='Unread Notification' href=""></a> */}
                          <FaBell/> &nbsp; Notification <span>{notificationCounter}</span> 
                          </Dropdown.Item>
                          <Dropdown.Item onClick={(e) => {logout(e)}} >
                          <span><FaSignOutAlt/> &nbsp; Sign out</span>
                          </Dropdown.Item>
                          
            </DropdownButton>
               
            {/* </Link> */}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;