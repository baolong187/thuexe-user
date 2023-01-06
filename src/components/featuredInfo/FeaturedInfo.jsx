import React from 'react'
import './featuredInfo.css';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import RouteIcon from '@mui/icons-material/Route';

function FeaturedInfo() {
  return (
    <div className='featured'>
      <div className="featuredItem">
          <span className="featuredTitle">Cars</span>
          <div className="featuredContainer carContainer">
            <span className="featuredProperty">
                Available: 30
            </span>
            <br/>
            <span className="featuredProperty">
                Being hired: 15
            </span>
            <br/>
            <span className="featuredProperty">Total: 45</span>
          </div>
      </div>
      
      <div className="featuredItem">
          <span className="featuredTitle">Orders</span>
          <div className="featuredContainer billContainer">
            <span className="featuredProperty">
                Available: 30
            </span>
            <br/>
            <span className="featuredProperty">
                Being hired: 15
            </span>
            <br/>
            <span className="featuredProperty">Total: 45</span>
          </div>
      </div>

      <div className="featuredItem">
          <span className="featuredTitle revenueContainer">Revenue</span>
          <div className="featuredContainer">
            <span className="featuredProperty">
                Available: 30
            </span>
            <br/>
            <span className="featuredProperty">
                Being hired: 15
            </span>
            <br/>
            <span className="featuredProperty">Total: 45</span>
          </div>
      </div>
    </div>
  )
}

export default FeaturedInfo
