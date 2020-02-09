import React from 'react';
import { Nav } from 'react-bootstrap'
import './Navigation.css';

const Navigation = ({ routeChange, isSignedIn }) => {
    if(isSignedIn){
        return ( 
            <Nav className="justify-content-end">
                <Nav.Item>
                    <Nav.Link onClick = {() => routeChange('signin') }>Sign Out</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    } else {
        return ( 
            <Nav className="justify-content-end">
                <Nav.Item>
                    <Nav.Link onClick = {() => routeChange('signin') }>Sign in</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick = {() => routeChange('register') }>Register</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}

export default Navigation;