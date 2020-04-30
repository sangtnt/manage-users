import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';

function Menu(){
    let location= useLocation();
    if (location.pathname==="/error"){
        return "";
    }
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand>Shelter</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link><Link className="link-menu" to="/">Home</Link></Nav.Link>
                <Nav.Link><Link className="link-menu" to="/users">Users</Link></Nav.Link>
                </Nav>
                {   
                    location.pathname==="/users"?
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    :""
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Menu;