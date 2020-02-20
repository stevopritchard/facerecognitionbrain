import React from 'react';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai'; //we've moved API call to back
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import './App.css';

// const app = new Clarifai.App({
//   apiKey: 'c5fa362e9f6e4bb5810c7371dd13a128'
//  });

const particleStyles = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    },
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    move:{
      enable: true,
      speed: 5
    },
    interactivity:{
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: [
            "repulse"
          ]
        }
      }
    },
    modes: {
      repulse: {
        distance: 400,
        duration: 0.4
      }
    },
    "retina_detect": true 
  }
}

const initialState = {
  input: '',
  imageURL:'',
  response: [],
  facebox: {},
  signedIn: false,
  //this is the active user profile
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = 
      {initialState,
        route: 'signin'
      };
  }

  //this sets up the user profile, 
  //which is return from the database 
  //upon successful registration
  loadUser = (data) => { 
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
    console.log(this.state.user)
  }

  componentDidMount() {
    //fetching the user list from the server (running on port 5000)
    fetch('https://ancient-mountain-30991.herokuapp.com/')
    .then(response => response.json())
    .then(console.log)
  }

  defineFace = (data) => {
    let boundries = data['outputs'][0]['data']['regions'][0]['region_info']['bounding_box']
    console.log(boundries)
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(width, height)
    return {
      left_col: boundries.left_col * width,
      top_row: boundries.top_row * height,
      right_col: width - (boundries.right_col * width),
      bottom_row: height - (boundries.bottom_row * height),
    }
  }

  onRouteChange = ( route ) => {
    
    this.setState({route: route})
    if(route === 'signin' || route === 'register') {
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({signedIn: true})
    }
  }

  setBox = (facebox) => {
    this.setState({facebox: facebox})
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  searchImage = () => {
    this.setState({imageURL: this.state.input})
      
    //FACE_DETECT --> NOW MOVED TO BACK-END TO 
    // app.models.predict(
    //     "a403429f2ddf4b49b307e318f00e528b", 
    //     this.state.input
    //   )
    fetch('https://ancient-mountain-30991.herokuapp.com/imageURL', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          //we already have the 'id' of the user
          //when they sign in
          input: this.state.input
      })
    })
    .then(response => response.json())
    .then(
    response => {
      if (response) {
        fetch('https://ancient-mountain-30991.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              //we already have the 'id' of the user
              //when they sign in
              id: this.state.user.id
          })
        })
        // .then(this.setState(prevState => { //to update the 'entries' property of user, this creates a copy of the entries object and update it
        //     let user = Object.assign({}, prevState.user);
        //     user.entries = user.entries+1;
        //     return { user };
        //   })
        // )
        .then(response => response.json())
        .then(response=> {
          this.setState(prevState => ({
            user: {
              ...prevState.user,
              entries: response
            }
          }))
          console.log(response)
        })
        .catch(err => console.log(err))
      }
      this.setBox(this.defineFace(response))
      })
    .catch((err) => {console.log(err)});
  }

  render() {
    const { signedIn, route, facebox, imageURL } = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particleStyles}
        />
        <Navigation routeChange = {this.onRouteChange} isSignedIn = {signedIn}/>
        {route === 'home' 
          ? <div>
              <Logo/> 
              <Rank 
                name={this.state.user.name} 
                entries={this.state.user.entries}
              />
              <ImageLinkForm 
                imgChange = {this.onInputChange} 
                imgSelect = {this.searchImage}
              />
              <FaceRecognition 
                image = {imageURL} 
                box = {facebox}
              />
            </div>
          : (route === 'signin'
            ? <Signin 
                routeChange = {this.onRouteChange} 
                loadUser={this.loadUser}
              />
            : <Register 
                routeChange = {this.onRouteChange} 
                loadUser={this.loadUser}
              />
            )
        }
      </div>
    );
  }
}

export default App;
