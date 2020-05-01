import React, { Component } from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Menu extends Component{
    constructor(){
        super();
        this.state={
            searchInput:""
        }
        this.handleChange= this.handleChange.bind(this);
    }
    handleChange(event){
        let name= event.target.name;
        let value=event.target.value;
        this.setState({
            [name]:value
        });
        let {history}= this.props;
        if (value!==""){
            history.push(`/users/:page/:userId/search/${value}`);
        }
        else{
            history.goBack();
        }
    }
    handleSubmit=(event)=>{
        event.preventDefault();
    }
    render(){
        let {location}= this.props;
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
                        (location.pathname==="/users"||location.pathname.includes("/users/:page/:userId/search"))?
                        <div>
                            <FormControl value={this.state.searchInput} name="searchInput" onChange={this.handleChange} type="text" placeholder="Search" className="mr-sm-2" />
                        </div>
                        :""
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
function submitUser(){
    
}
export default Menu;