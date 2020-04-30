import React, { Component } from 'react';
import axios from 'axios';
import {Modal ,Button} from 'react-bootstrap';
class UsersModel extends Component {
    constructor(){
        super();
        this.state={
            user: {}
        }
    }
    componentDidMount(){
        let {idUser} = this.props.match.params;
        axios.get(`/users/${idUser}`)
        .then(user=>{
            this.setState({
                user: user.data.user
            })
        })
        .catch(err=> console.log(err));
    }
    closeModel=()=>{
        let {history} = this.props;
        history.push("/users");
    }
    deleteUser= ()=>{
        let {user} = this.state;
        let {history} = this.props;
        axios.get(`/users/delete/${user._id}`)
        .then(
            history.push('/users')
        );
    }
    render() {
        let {user, show} =this.state;
        return (
            <div>
                <Modal
                    size="lg"
                    show={true}
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {user.fullname}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="user-contain">
                            <img className="user-info-img" src={user.image}/>
                            <div className="user-info user-info-key">
                                <p>
                                    Age:<br/>
                                    Email:<br/>
                                    Phone:<br/>
                                    Country:
                                </p>
                            </div>
                            <div className="user-info">
                                {user.age} <br/>
                                {user.email} <br/>
                                {user.phone} <br/>
                                {user.country}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">Edit</Button>
                        <Button onClick={this.deleteUser} variant="danger">Delete</Button>
                        <Button onClick={this.closeModel} variant="outline-danger">Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default UsersModel;