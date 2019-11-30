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
      facebox: []
    }
  }

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

searchImage = () => {
    this.setState({imageURL: this.state.input})
    console.log(this.state.imageURL)
    //GENERAL_MODEL
    // app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
    //   .then(generalModel => {
    //     return generalModel.predict(this.state.imageURL);
    //   })
    //   .then(response => {
    //     var concepts = response['outputs'][0]['data']['concepts']
    //     console.log(concepts)
    //     this.setState({response: concepts})
    //   })
    
    //FACE_DETECT
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        var concepts = response['outputs'][0]['data']['regions'][0]['region_info']['bounding_box']
        console.log(concepts)
        this.setState({facebox: response['outputs'][0]['data']['regions'][0]['region_info']['bounding_box']})
      },
      function(err) {
        // there was an error
      }
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
        <FaceRecognition image={this.state.imageURL} response={this.state.response} box={this.state.facebox}/>
      </div>
    );

  }
}

export default App;
