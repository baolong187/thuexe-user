import React from 'react'
import {Link} from 'react-router-dom';

import { Heading } from '../components/Heading';

import { Footer } from '../components/Footer';

import { Slide } from '../components/Slide';

import { CarList } from './Car';

export const ChooseCar = () => {
    return(
    <>
        <Heading />
        <Slide/>
        <br/>
        <div className="d-flex justify-content-center">
            <div className='container'>
                <div className='row'>
                    <CarList/>
                </div>
            </div>
        </div>
        {/* <Footer /> */}
    </>
    )
}

