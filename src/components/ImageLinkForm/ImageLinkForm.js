import React from 'react';
import {Button, InputGroup, FormControl} from 'react-bootstrap';
import './ImageLinkForm.css';

const ImageLinkForm = ({imgChange, imgSelect}) => {
    return (
        <div>
            <p>{'This Magic Brain will detect faces in your pictures. Give it a try'}</p>
            <div className="container">
                <InputGroup className="mb-3">
                    <FormControl type="text" placeholder="Enter image URL" onChange= {imgChange}/>
                    <InputGroup.Append>
                        <Button variant="dark" onClick={imgSelect}>Detect</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        </div>
    )
}

export default ImageLinkForm