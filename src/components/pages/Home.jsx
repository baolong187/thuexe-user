import React from 'react'
import Chart from '../chart/Chart';
import FeaturedInfo from '../featuredInfo/FeaturedInfo';
import './home.css';

function Home() {
  return (
    <div className='home'>
        <FeaturedInfo/>
        <Chart/>
    </div>
  )
}

export default Home
