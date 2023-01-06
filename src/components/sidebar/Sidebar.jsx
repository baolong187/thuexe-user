import React from 'react'
import './sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import {Link} from 'react-router-dom';

function Sidebar() {

  const enableActive = (event) => {
    const list = document.querySelectorAll('.sidebarListItem');
    list.forEach(item => {
      item.classList.remove('active');
    });
    event.target.parentNode.classList.add('active');
  }

  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <HomeIcon className='sidebarIcon'/>
              <Link to='/admin' onClick={enableActive}  style={{  color: 'inherit', textDecoration: 'inherit' }}>Trang chủ</Link>
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Xe</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={enableActive}>
              <InventoryIcon className='sidebarIcon'/>
              Quản lý xe
            </li>
            <li className="sidebarListItem" onClick={enableActive}>
              <DirectionsCarIcon className='sidebarIcon'/>
              Danh sách xe
            </li>
            <li className="sidebarListItem" onClick={enableActive}>
              <EqualizerIcon className='sidebarIcon'/>
              <Link onClick={enableActive} to='/admin/cars/statistic'  style={{  color: 'inherit', textDecoration: 'inherit' }}>Thống kê xe </Link> 
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">User</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={enableActive}>
              <PersonIcon className='sidebarIcon'/>
              Danh sách user
            </li>
            <li className="sidebarListItem" onClick={enableActive}>
              <ManageAccountsIcon className='sidebarIcon'/>
              Quản lý user
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Hóa đơn</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={enableActive}>
              <HourglassTopIcon className='sidebarIcon'/>
              <Link onClick={enableActive} to='/admin/bills/confirm'  style={{  color: 'inherit', textDecoration: 'inherit' }}> Chờ duyệt </Link> 
            </li>
            <li className="sidebarListItem" onClick={enableActive}>
              <AddBoxIcon className='sidebarIcon'/>
              Quản lý hóa đơn
            </li>
            <li className="sidebarListItem" onClick={enableActive}>
              <DescriptionIcon className='sidebarIcon'/>
              Thống kê hóa đơn
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
