import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'
import {  auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";




function BasicExample( {toggleSidebar}) {
  const navigate = useNavigate();

 
const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/login"); // manually navigate after signout
  } catch (error) {
    console.error("Logout error:", error);
  }
};
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className='contain'>
      <button className="menu-btn" onClick={() => toggleSidebar()}>☰</button>
        <Navbar.Brand href="#home">ChatApp</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> */}
        <Navbar.Brand   onClick={() => handleLogout()} className='log'>Log out</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default BasicExample;