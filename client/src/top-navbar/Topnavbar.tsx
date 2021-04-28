import React   from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

interface Props {
  handleToUpdate: (param1:string, param2:number) => string; 
};

class Topnavbar extends React.Component<Props> {
  render(){
    var handleToUpdate = this.props.handleToUpdate;
    return(
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="" onClick={() => handleToUpdate('',0)}>Fargus Project</Navbar.Brand>
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