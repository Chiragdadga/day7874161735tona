import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Tesseract from "tesseract.js";
import img from './1.jpg'

class SliderDetails extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            imageDetails : [],
            loading : true,
            imgText : ""
        }
    }
    componentDidMount(){
        Axios.get(`https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images?id=${this.props.match.params.id}`)
        .then(response => {
            this.setState({ imageDetails : response.data,loading : false })
        })
        .catch(err => console.error(err));
    }
    scanImage = () => {
        this.setState({ loading : true })
        Tesseract.recognize(img, "eng")
        .then(result => {
            this.setState({ imgText : result.data.text, loading : false })
      })
      .catch(err => console.error(err));
    }
    render() {
        const { imageDetails, loading, imgText } = this.state;
        var features = imageDetails.features;
        return(
            <div className={loading ? "slider-details loader" : "slider-details"}>
                   <Container maxWidth="md">
                   <div className="heading">
                        <h4>Details</h4>
                        <span></span>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item md={3}>
                            <img src={imageDetails.url} className="img"/>
                        </Grid>
                        <Grid item md={9}>
                        <h3>{imageDetails.title}</h3>
                        <span>Quantity : {imageDetails.quantity}</span>
                        <h6>Description</h6>
                        <p>{imageDetails.description}</p>
                        </Grid>
                    </Grid>
                    <h6>Features :</h6> 
                        <ol>
                            {
                                features && features.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })
                            }
                        </ol>
                        <div className="text-center">
                            <button className="" onClick={this.scanImage}>Scan Now</button>
                        </div>
                        {imgText && <h5 className="img-text">{imgText}</h5>}
                   </Container>
            </div>
        )
    }
}
export default SliderDetails