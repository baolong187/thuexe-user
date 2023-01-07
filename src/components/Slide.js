import React from 'react'
// import {Link} from 'react-router-dom';
import {
    Carousel,
}from 'react-bootstrap';

export const Slide = () => {
    return(
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://happyroad.vn/wp-content/uploads/2019/02/LPT0712_117-copy.jpg"
                style={{width: '1836px', height: '580px'}}
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>Thuê xe</h3>
                <p>Tận hưởng chuyến đi của bạn.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwam91cm5leXxlbnwwfHwwfHw%3D&w=1000&q=80"
                style={{width: '1836px', height: '580px'}}
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3>Thuê xe</h3>
                <p>Đi lại thoải mái không giới hạn.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://wallpaperaccess.com/full/3497141.jpg"
                style={{width: '1836px', height: '580px'}}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Thuê xe</h3>
                <p>Hàng trăm loại xe cho bạn.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}