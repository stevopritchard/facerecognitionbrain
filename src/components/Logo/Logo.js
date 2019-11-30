import React from 'react';
import './Logo.css'
import brain from './brain.png'
import Tilt from 'react-tilt';

const Logo = () => {
    return (
        <div className="Logo">
            <Tilt className="Tilt" options={{ max : 60 }} >
                <div className="Tilt-inner">
                    <img src={brain} alt="logo"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo