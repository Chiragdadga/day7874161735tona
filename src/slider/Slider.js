import React, { Component } from 'react';
import '../App.css';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
class Slider extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            imagesList : [],
            loading : true
        }
    }
    componentDidMount(){
        document.getElementById('app-prev').addEventListener('click', () => {
			document.getElementsByClassName('swiper-buttons-prev')[0].click();
		}, false)
		document.getElementById('app-next').addEventListener('click', () => {
			document.getElementsByClassName('swiper-buttons-next')[0].click();
        }, false)
        
        Axios.get("https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images/list")
        .then(response => {
            this.setState({ imagesList : response.data, loading : false })
        })
        .catch(err => console.error(err));
    }
    componentWillUnmount() {
		document.getElementById('app-prev').removeEventListener('click', () => {}, false)
		document.getElementById('app-next').removeEventListener('click', () => {}, false)
	}
    render() {
        const { imagesList, loading } = this.state;
        const SwiperOptions = {
            spaceBetween: 40,
            observer: true,
            loop: true,
			speed: 600,
			autoplay: {
				delay: 2000,
            },
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true
              },
			navigation: {
				nextEl: '.swiper-buttons-next',
				prevEl: '.swiper-buttons-prev',
			},
			breakpoints: {
                640: {
					slidesPerView: 1,
					spaceBetween: 30,
                },
                768: {
					slidesPerView: 2,
					spaceBetween: 30,
                },
				1024: {
					slidesPerView: 3,
					spaceBetween: 30,
                },

               
			}
		};
        return(
            <div className={loading ? "slider loader" : "slider"}>
                 <Container maxWidth="xl">
                    <div className="heading">
                        <h4>images</h4>
                        <span></span>
                    </div>
                    <div className="slider-images">
                        <Swiper  { ...SwiperOptions }>
                            {
                                imagesList && imagesList.map((item, index) => {
                                    return <div key={index} className="img">
                                        <Link to={`/slider/${item.id}`}><img src={item.url} className="" alt="" /></Link>
                                    </div>
                                })
                            }
                        </Swiper>
                        <div className="img-fluid controls prev" id="app-prev">{"<"}</div>
                        <div className="img-fluid controls next" id="app-next">{">"}</div>
                    </div>
                 </Container>
            </div>
        )
    }
}

export default Slider;