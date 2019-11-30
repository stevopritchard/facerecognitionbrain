import React from 'react';

const NameValues = ({num, name, value}) => {
    return (
        <p style={{color: 'white'}}>
            {num}.{name}: {value}
        </p>
    )
}

class Facebox extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.refs.image;

        this.props.box === [] ? 
        ctx.fillRect(0,0, 100, 100)
        : 
        img.onload = () => {
            let dx = (this.props.box.left_col)*img.width;
            let dy = (this.props.box.top_row)*img.height;
            let dWidth = ((this.props.box.right_col)*img.width)-dx;
            let dHeight = ((this.props.box.bottom_row)*img.height)-dy;
            console.log(img.width, img.height)
            console.log(this.props.box.left_col)
            ctx.drawImage(img, dx, dy, dWidth, dHeight)
        };

        // let dx = (this.props.box.left_col)*img.width;
        // let dy = (this.props.box.top_row)*img.height;
        // let dWidth = ((this.props.box.right_col)*img.width)-dx;
        // let dHeight = ((this.props.box.bottom_row)*img.height)-dy;

    //     img.onload = () => {
    //         // ctx.drawImage(img, dx , dy, dWidth, dHeight)
    //         ctx.drawImage(img,0,0)
    //   }
    }

    componentDidUpdate() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.refs.image;
        
        console.log(this.props.box)

        this.props.box === [] ? console.log(true) : console.log(false)

        this.props.box === [] ? 
        ctx.fillRect(0,0, 100, 100)
        : 
        img.onload = () => {
            ctx.drawImage(
                img,
                (this.props.box.left_col)*img.width,
                (this.props.box.top_row)*img.height,
                ((this.props.box.right_col)*img.width)-((this.props.box.left_col)*img.width),
                ((this.props.box.bottom_row)*img.height)-((this.props.box.top_row)*img.height)

            )
        };
    }

    render() {
      return(
        <div>
          <canvas ref="canvas" width={640} height={425} />
          <img ref="image" src={this.props.boxImage} style={{display: "hidden"}} />
        </div>
      )
    }
}

const FaceRecognition = ({image, response, box}) => {
    return (
        <div>
            <img className="image" alt="#" src={image} style={{width: "40%", height: "auto"}}/>
                {/* {
                    response.map((user, i) => {
                        return(
                            <div>
                            <NameValues
                            num={i}
                            name={response[i].name}
                            value={response[i].value}
                            />
                            
                            </div>
                        );
                    })
                } */}
                <Facebox boxImage={image} box={box}/>
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