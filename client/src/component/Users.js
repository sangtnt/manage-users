import React, { Component} from 'react';
import {Table} from 'react-bootstrap';

import Pagina from './Pagina';
import UsersModel from './UsersModel';
import List from "./List";
import axios from 'axios';
import {Link, Route} from 'react-router-dom';;

class Users extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }
    componentDidMount(){
        axios.get('/users')
        .then(users=>{
            this.setState({
                users: users.data.users.slice(0,10)
            })
        })
    }
    render() {
        let {users}= this.state;
        return (
            <div>
                <Table className="table-user" responsive="sm" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Country Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <List items={users} render={user=>{
                            return (
                                <tr>
                                    <td><Link to={`/users/${user._id}`}>{user.fullname}</Link></td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.country}</td>
                                </tr>
                            )
                        }}/>
                        <div className="tfoot">
                            <Pagina/>
                        </div>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Users;