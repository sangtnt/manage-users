import React, { Component} from 'react';
import {Table, Button} from 'react-bootstrap';

import Pagina from './Pagina';
import List from "./List";
import axios from 'axios';
import {Link, Route} from 'react-router-dom';


import UsersModel from './UsersModel';

class Users extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            page:0,
            pages:0
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        let nextPathname= nextProps.location.pathname;
        let {pathname}= this.props.location;
        let nextPage= nextState.page;
        let {page} = this.state;
        let nextUsers=nextState.users;
        let {users} = this.state;
        if(nextPathname===pathname&&nextPage===page&&nextUsers.length===users.length){
            return false;
        }
        return true;
    }
    componentDidUpdate(){
        this.getUser();
    }
    componentDidMount(){
        this.getUser();
    }
    getUser=()=>{
        let {page} =this.props.match.params;
        if(page===undefined){
            page=1;
        }
        if (page===null){
            page=1;
        }
        let rowNum=9;
        axios.get('/users')
        .then(users=>{
            let pages=Math.ceil(users.data.users.length/rowNum)
            if (page>pages||page<1){
                page=pages;
            }
            let start= (page-1)*rowNum;
            let end=page*rowNum;
            this.setState({
                users: users.data.users.slice(start,end),
                page:page,
                pages: pages 
            })
        });
    }
    render() {
        let {users, page, pages}= this.state;
        page = parseInt(page);
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
                                    <td><Link className="fullname-user" to={`/users/${page}/${user._id}`}>{user.fullname}</Link></td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.country}</td>
                                </tr>
                            )
                        }}/>
                        <div className="tfoot tfoot-right">
                            <Pagina pages={pages} active={page}/>
                        </div>
                        <Link to="/users/addnew">
                            <div className="tfoot tfoot-left">
                                <Button variant="info">Add new</Button>
                            </div>
                        </Link>
                    </tbody>
                </Table>
                <Route exact path={`/users/:page/:idUser`} component={UsersModel}/>
            </div>
        );
    }
}

export default Users;