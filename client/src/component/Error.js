import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
class Error extends Component{
    componentDidMount(){
        document.body.classList.add('body-error');
    }
    componentWillUnmount(){
        document.body.classList.remove('body-error');
    }
    render(){
        return(
            <div>
                <p className="error-title notify">Oops!</p>
                <p className="error-mess mess-404">404 page not found</p>
                <p className="error-mess">The page you are looking for might have been removed or is unavailable. <br/>
                <Link to="/"><Button block size="lg" className="error-btn"><span className="notify">Back to Home Page</span></Button></Link>
                </p>
            </div>
        )
    }
}
export default Error;