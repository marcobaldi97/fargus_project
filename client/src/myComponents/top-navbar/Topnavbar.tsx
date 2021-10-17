import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Topnavbar.css";

interface TopnavbarProps {}

interface TopnavbarState {}

class Topnavbar extends React.Component<TopnavbarProps, TopnavbarState> {
	render() {
		return (
			<Navbar className="navBarPredefs" bg="light" variant="dark" expand="lg">
				<Link to="/">
					<Navbar.Brand>Fargus Project</Navbar.Brand>
				</Link>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<NavDropdown title="Views" id="basic-nav-dropdown">
							<NavDropdown.Item>
								<Link to="/allPublications">Publications</Link>
							</NavDropdown.Item>

							<NavDropdown.Item>
								<Link to="/mainCategories">Main Categories</Link>
							</NavDropdown.Item>

							<NavDropdown.Item>
								<Link to="/makeNewPost"> Make a new Post! </Link>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
export default Topnavbar;
