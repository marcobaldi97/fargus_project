import React   from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

class Topnavbar extends React.Component {
  render(){
    var handleToUpdate = this.props.handleToUpdate;
    return(
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="" onClick={() => handleToUpdate('')}>Fargus Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Views" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => handleToUpdate('Publications',0)} >Publications</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleToUpdate('Main Category',0)} >Main Category</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Topnavbar;