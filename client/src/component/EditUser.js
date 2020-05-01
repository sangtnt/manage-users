import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import countries from "../country.json";
import List from './List';
import axios from 'axios';
import { store } from 'react-notifications-component';
import 'animate.css';
class EditUser extends Component {
    constructor(props){
        super(props);
        this.state={
            fullname:"",
            age:0,
            phone:"",
            email:"",
            country:"",
            image:"",
            cancle: true
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
                country:user.data.user.country,
                image:user.data.user.image
            })
        })
    }
    handleChange=(event)=>{
        let name=event.target.name;
        let value= event.target.value;
        this.setState({
            [name]: value,
            cancle: false
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        let {userId} = this.props.match.params;
        let {fullname,age,phone,email,country, image} =this.state;
        let user={
            _id: userId,
            fullname: fullname,
            age: age,
            phone: phone,
            email: email,
            country: country,
            image: image
        }
        axios.post('/users/update', user)
        .then((res)=>{
            let {userId} = this.props.match.params;
            let {history} = this.props;
            store.addNotification({
                title: "Successfully!",
                message: res.data,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                duration: 3000,
                onscreen: true
                }
            });
            history.goBack();
        })
        .catch(err=>{
            store.addNotification({
                title: "Fail!",
                message: err.message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onscreen: true
                }
            });
        });
    }
    handleCancle=()=>{
        let {cancle} =this.state;
        let res=true;
        if (!cancle){
            res=window.confirm("Leave this page?");
        }
        if (res){
            let {userId} = this.props.match.params;
            let {history} =this.props;
            history.push(`/users/${userId}`);
        }
    }
    render() {
        let {fullname,age,phone,email,country, image} =this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
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

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="image" onChange={this.handleChange} type="text" value={image} required/>
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
                        Edit
                    </Button>
                    <Button onClick={this.handleCancle} style={{marginLeft: "20px"}} variant="danger">
                        Cancle
                    </Button>
                </Form>
            </div>
        );
    }
}

export default EditUser;