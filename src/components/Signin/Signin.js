import React from 'react'
import './Signin.css'
import UserForm from '../Userform/Userform'

class Signin extends React.Component {
    constructor() {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://ancient-mountain-30991.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
              this.props.loadUser(user);
              this.props.routeChange('home');
            }
          })
    }

    render() {
        const { routeChange } = this.props;
        return (
            <UserForm 
                cardTitle = {"Sign In"}
                formGroup = {[
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
                onSubmitFunction = {this.onSubmitSignIn}
                buttonTitle = {"Sign In"}
                routeChangeFunction = {routeChange}
            />
        )

    }
}

export default Signin