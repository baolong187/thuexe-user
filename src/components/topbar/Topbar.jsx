import React from 'react';
import './topbar.css';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';

function Topbar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Chungxe admin</span>
                </div>
                <div className="topRight">
                  <div className="topbarIconContainer">
                    <SettingsIcon/>
                  </div>
                  <div className="topbarIconContainer">
                    <NotificationsNoneOutlinedIcon/>
                  </div>
                  <img 
                    src="https://genmec.vn/wp-content/uploads/2020/11/bao-cao-su-don-den-gai-deo-ngon-tay.jpg" 
                    alt="avatar" 
                    className="topAvatar" 
                    onClick={handleClick}  
                  />      
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>My account</MenuItem>
                    <Link style={{color:'inherit', textDecoration:'inherit'}} to="/admin/login">
                      <MenuItem>Logout</MenuItem>
                    </Link>
                    
                  </Menu>        
                </div>
        </div>
    </div>
  )
}

export default Topbar