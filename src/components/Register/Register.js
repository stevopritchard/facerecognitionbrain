import React from 'react'
import UserForm from '../Userform/Userform'

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            responseText: ''
        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onSubmitRegister = () => {
        const { loadUser, routeChange } = this.props;
        if ( this.state.registerName === '' || this.state.registerEmail === ''|| this.state.registerPassword === '') {
            this.setState({responseText: "Please fill in all fields."})
        } else {
            fetch('http://localhost:5000/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: this.state.registerName,
                    email: this.state.registerEmail,
                    password: this.state.registerPassword
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    loadUser(user)
                    routeChange('home')
                }
            });

        }
    }

    render() {
        return (
            <UserForm 
                cardTitle = {"Sign Up"}
                formGroup = {[
                    {
                        type: "email",
                        placeholder: "Enter name",
                        onChange: this.onNameChange
                    },
                    {
                        controlId: "formBasicEmail",
                        type: "email",
                        placeholder: "Enter email",
                        onChange: this.onEmailChange
                    },
                    {
                        controlId: "formBasicPassword",
                        type: "password",
                        placeholder: "Password",
                        onChange: this.onPasswordChange

                    }
                ]}
                responseText = {this.state.responseText}
                onSubmitFunction = {this.onSubmitRegister}
                buttonTitle = {"Register"}
            />
        )
    }
}

export default Register