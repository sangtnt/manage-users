import React, { Component } from 'react';
import axios from 'axios';
import {Modal ,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { store } from 'react-notifications-component';
import 'animate.css';
class UsersModel extends Component {
    constructor(){
        super();
        this.state={
            user: {}
        }
    }
    componentDidMount(){
        this.getUser();
    }
    componentWillReceiveProps({ location={} }){
        this.getUser();
    }
    getUser=()=>{
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
        .then((res)=>{
            store.addNotification({
                title: "Successfully!",
                message: res.data,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 2000,
                  onscreen: true
                }
              });
            history.push("/users");
        })
        .catch(err=>{
            store.addNotification({
                title: "Fail!",
                message: "Delete Fail!",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 2000,
                  onscreen: true
                }
            });
        })
    }
    render() {
        let {user} =this.state;
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
                        <Link to={`/users/update/${user._id}`}><Button variant="secondary">Edit</Button></Link>
                        <Button onClick={this.deleteUser} variant="danger">Delete</Button>
                        <Button onClick={this.closeModel} variant="outline-danger">Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default UsersModel;