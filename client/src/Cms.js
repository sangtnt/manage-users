import React from 'react';

import {Container, Button} from 'react-bootstrap';
import Users from "./component/Users";
import {Switch, Route} from 'react-router-dom';
import EditUser from './component/EditUser';
function Cms (){
    return (
        <Container>
            <Switch>
                <Route path="/users/update/:userId" component={EditUser}/>
                <Route path="/users" component={Users}/>
            </Switch>
        </Container>
    );
}

export default Cms;