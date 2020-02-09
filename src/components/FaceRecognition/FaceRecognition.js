import React from 'react';
import './FaceRecognition.css'

// const NameValues = ({num, name, value}) => {
//     return (
//         <p style={{color: 'white'}}>
//             {num}.{name}: {value}
//         </p>
//     )
// }

// class Facebox extends React.Component {

//     componentDidMount() {
//         console.log(this.props.box)
//         const canvas = this.refs.canvas;
//         const ctx = canvas.getContext("2d");
//         const img = this.refs.image;

//         ctx.fillRect(0,0, 100, 100)
//     }

//     componentDidUpdate() {
//         console.log(this.props.box)
//         const canvas = this.refs.canvas;
//         const ctx = canvas.getContext("2d");
//         const img = this.refs.image;

//         img.onload = () => {
//             let dx = (this.props.box.left_col)*img.width;
//             let dy = (this.props.box.top_row)*img.height;
//             let dWidth = ((this.props.box.right_col)*img.width)-dx;
//             let dHeight = ((this.props.box.bottom_row)*img.height)-dy;
//             ctx.drawImage(img, dx, dy, dWidth, dHeight, 0, 0, dWidth, dHeight)
//             img.style = {width: "400px"}
//         };
//     }

//     render() {
//       return(
//         <div>
//           <canvas ref="canvas" width={640} height={425} />
//           <img ref="image" src={this.props.boxImage} style={{display: 'none'}} className="hidden" />
//         </div>
//       )
//     }
// }

function throwBox(boxprop) {
    if(!boxprop){
        return {left: '',  top: '', right: '', bottom: ''}
    } else {
        return {left: boxprop.left_col,  top: boxprop.top_row, right: boxprop.right_col, bottom: boxprop.bottom_row}
    }
}

const FaceRecognition = ({image, box}) => {
    return (
        <div className="container">
            <div className="position-absolute">
                <img id="inputImage" alt="" src={image} style={{width: "500px", height: "auto"}}/>
                <div className="bounding-box" style={throwBox(box)}></div>
            </div>
        </div>
    )
}



// class FaceRecognition extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//           final: ''
//         }
//       }
//     // const {image, response} = this.props;
    
//     Arr = () => {
//         var i;
//         for(i=0; i<this.props.response.length; i++){
//             return (
//                 this.setState({final: JSON.stringify(this.props.response[i].name)})
//             )
//         }
//     }
//     render() {
        
//         return (
//             <div>
//                 <img atl="#" src={this.props.image} style={{maxHeight: "200px"}}/>
//                 <NameValues text={this.state.final}/>
//             </div>
//         )
//     }
// }

export default FaceRecognition