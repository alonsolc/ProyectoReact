import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavbarComponent extends React.Component {
    render() {
        return (

            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>MDP technical test</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Users</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/dashboard">
                                <Nav.Link>Dashboard</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavbarComponent;