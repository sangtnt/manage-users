import React from 'react';

import {Container, Button} from 'react-bootstrap';
import Users from "./component/Users";
import {Switch, Route} from 'react-router-dom';
import UsersModel from './component/UsersModel';
function Cms (){
    return (
        <Container>
            <Route path="/users" component={Users}/>
            <Route path="/users/:idUser" component={UsersModel}/>
        </Container>
    );
}

export default Cms;