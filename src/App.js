import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '52a4674bbeeb43b8a331bf43162d9d99'
 });

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


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL:'',
      response: [],
      facebox: {}
    }
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

  setBox = (facebox) => {
    this.setState({facebox: facebox})
  }

  

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  searchImage = () => {
    this.setState({imageURL: this.state.input})
      
    //FACE_DETECT
    app.models.predict(
        "a403429f2ddf4b49b307e318f00e528b", 
        this.state.input
      )
      .then(
      response => {
        this.setBox(this.defineFace(response))
      })
      .catch((err) => {console.log(err)}
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particleStyles}
        />
        <Navigation />
        <Logo/>
        <Rank/>
        <ImageLinkForm imgChange={this.onInputChange} imgSelect={this.searchImage}/>
        <FaceRecognition image={this.state.imageURL} box={this.state.facebox} response={this.state.response}/>
      </div>
    );
  }
}

export default App;
