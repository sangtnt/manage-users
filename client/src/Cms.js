import React from 'react';

import {Container} from 'react-bootstrap';
import Users from "./component/Users";
import {Switch, Route, Redirect} from 'react-router-dom';
import EditUser from './component/EditUser';
import Addnew from './component/Addnew';
import Menu from "./component/Menu";
import Error from "./component/Error" ;
function Cms (){
    return (
        <Container fluid>
            <Route path="/" component={Menu}/>
            <Container>
                <Switch>
                    <Route path="/users/addnew" component={Addnew}/>
                    <Route path="/users/update/:userId" component={EditUser}/>
                    <Route path="/users/:page/:userId/search/:userName" component={Users}/>
                    <Route path="/users/:page" component={Users}/>
                    <Route path="/users" component={Users}/>
                    <Route exact path="/" component={Users}/>
                    <Route path="/error" component={Error}/>
                    <Redirect to="/error"/>
                </Switch>
            </Container>
        </Container>
    );
}

export default Cms;