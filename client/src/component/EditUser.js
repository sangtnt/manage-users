import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import countries from "../country.json";
import List from './List';
import axios from 'axios';
class EditUser extends Component {
    constructor(props){
        super(props);
        this.state={
            fullname:"",
            age:0,
            phone:"",
            email:"",
            country:""
        }
    }
    componentDidMount(){
        let {userId} = this.props.match.params;
        axios.get(`/users/${userId}`)
        .then(user=>{
            this.setState({
                fullname:user.data.user.fullname,
                age:user.data.user.age,
                phone:user.data.user.phone,
                email:user.data.user.email,
                country:user.data.user.country
            })
        })
    }
    handleChange=(event)=>{
        let name=event.target.name;
        let value= event.target.value;
        this.setState({
            [name]: value
        })
    }
    render() {
        let {fullname,age,phone,email,country} =this.state;
        return (
            <div>
                <Form validated={true}>
                    <Form.Group controlId="formBasicFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control name="fullname" onChange={this.handleChange} type="text" placeholder="Enter Full Name" value={fullname} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control name="age" onChange={this.handleChange} type="number" placeholder="Enter Age" value={age} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" onChange={this.handleChange} type="email" placeholder="Enter Email" value={email} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control name="phone" onChange={this.handleChange} type="text" placeholder="Enter Phone Number" value={phone} required/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Country</Form.Label>
                        <Form.Control name="country" onChange={this.handleChange} as="select" custom value={country} required>
                            <List
                                items={countries}
                                render={(item)=><option>{item.name}</option>}
                            />
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default EditUser;