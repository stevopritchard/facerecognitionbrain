import React from 'react';
import {Nav} from 'react-bootstrap'
import './Navigation.css';

const Navigation = () => {
    return (
        <Nav className="justify-content-end">
            <Nav.Item>
                <Nav.Link>Sign Out</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Navigation;