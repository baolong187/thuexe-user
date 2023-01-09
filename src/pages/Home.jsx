import { Heading } from '../components/Heading';
import { Slide } from '../components/Slide';
import { Footer } from '../components/Footer';
import { useLayoutEffect, useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import {Typography} from '@mui/material';

export const UserHome = () => {
  const[trip, setTrip] = useState(2);
  const handleChangeTrip = (event) => {
    setTrip(event.target.value);
  };
  const [car, setCar] = useState();
  const [seatInput, setSeatInput] = useState(4);
  const [seat, setSeat] = useState(4);
  useEffect(async () => {
    let carResult = await fetch("http://127.0.0.1:8000/api/cars/get-first-car");  
    carResult = await carResult.json(); 
    setCar(carResult.data);
  },[])

  const handleChangeNumber = (e) => {
    setSeatInput(e.target.value);
    let num = parseInt(e.target.value);
    if(num) {
      setSeat(e.target.value);
    }
  }

  const handleSearch = async () => {
    let carResult = await fetch("http://127.0.0.1:8000/api/cars/get-first-car?categoryId=" + trip + "&seat=" + seat);
    carResult = await carResult.json(); 
    setCar(carResult.data);
  }

  return(
  <>
    <Heading/>
    <Slide/>
    <main className='py-4'>
      <div className='container'>
        <div className='row'>
          <div className="col-md-12">
            {localStorage.getItem('user-info') ? 
              <></> : <h3 className="title">Lợi ích của thuê xe</h3> 
            }
          </div>
        </div>
        {localStorage.getItem('user-info') ? 
          <>
          <Grid container spacing={2} sx={{marginTop: "1%"}}>
            <Grid item fullWidth  xs={5}>
              <Box sx={{backgroundColor: "#E8E8E8", borderRadius: "0.5rem", marginTop: "3%", height: "100%"}} >
                <h4 style={{textAlign: "center"}}>Gợi ý thuê xe</h4>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                  <ImageListItem sx={{width: "100%", marginLeft: "2%"}}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1934/1934273.png"
                      alt="suggest"
                      loading="lazy"
                    />
                  </ImageListItem>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">Mục đích</InputLabel>
                          <Select 
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={trip}
                            label="Mục đích"
                            onChange={handleChangeTrip}
                          >
                            <MenuItem value={2}>Đi phố</MenuItem>
                            <MenuItem value={3}>Đi phượt</MenuItem>
                            <MenuItem value={5}>Đưa đón đối tác</MenuItem>
                            <MenuItem value={4}>Đám cưới</MenuItem>
                            <MenuItem value={1}>Về quê</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={5}>
                        <TextField id="outlined-basic" label="Số người" variant="outlined" size='small' type="number" InputProps={{ inputProps: { min: 1, max: 10 } }} onChange={handleChangeNumber} value={seatInput}/>
                      </Grid>
                      <Grid item xs={6}>
                        <Button onClick={handleSearch}>Tìm xe</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid> 
            <Grid item fullWidth  xs={7}>
              <Box sx={{backgroundColor: "#E8E8E8", borderRadius: "0.5rem", height: "100%"}} >
                <h4  style={{textAlign: "center"}}>Xe phù hợp với bạn</h4>
                <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                  <div className="media-body order-2 order-lg-1">
                    <a className="mt-0 font-weight-bold mb-2" href={car ? "detail/"+car.id : ""}>{car? car.name: ""}</a>
                      <div className="row">
                        <div className="col"><img src="https://icons.iconarchive.com/icons/icons8/android/512/Editing-Bg-Color-icon.png" style={{width : "20px", margin:"10px"}}/>Màu {car? car.color: ""}</div>
                        <div className="col"><img src="https://cdn-icons-png.flaticon.com/512/290/290081.png" style={{width : "30px", margin:"10px"}}/>Biển {car? car.licensePlate: ""} </div>
                        <div className="w-100"></div>
                        <div className="col"><img src="http://cdn.onlinewebfonts.com/svg/img_156330.png" style={{width : "20px", margin:"10px"}}/>{car? car.seatNumber: ""} Chỗ</div>
                        <div className="col"><img src="https://cdn-icons-png.flaticon.com/512/55/55283.png" style={{width : "40px", margin:"10px"}}/>Hạng {car? car.category: ""}</div>
                        <div className="w-100"></div>
                        <div className='col'> <img src={car? car.image64: ""} alt="Generic placeholder image" className="ml-lg-5 order-1 order-lg-2"/></div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-1">
                        <h6 className="font-weight-bold my-2 item-price"></h6>
                      </div>
                      <a className="list-btn" href={car ? "detail/"+car.id : ""}>Chi tiết</a>
                  </div>  
                </div> 
              </Box>
            </Grid>
          </Grid>
          </>
           :
          <div className='row'>
            <div className = "col-md-6">
              <div className="col-lg-4">
                <img src="https://cdn-icons-png.flaticon.com/512/1356/1356586.png" alt="" width="100" height="100"/>
                <h2>Nhiều lựa chọn</h2>
                <p>Hàng trăm loại xe đa dạng ở Hà Nội, phù hợp với mọi mục đích của bạn</p>
              </div>
              <div className="col-lg-4">
                <img src="https://cdn-icons-png.flaticon.com/512/6582/6582140.png" alt="" width="100" height="100"/>
                <h2>Hỗ trợ 24/7</h2>
                <p>Có nhân viên hỗ trợ khách hàng trong suốt quá trình thuê xe</p>
              </div>
            </div>
            <div className = "col-md-6">
              <div className="col-lg-4">
                <img src="https://cdn-icons-png.flaticon.com/512/138/138239.png" alt="" width="100" height="100"/>
                <h2>Giá cả cạnh tranh</h2>
                <p>Giá thuê được niêm yết công khai và rẻ hơn tới 10% so với giá truyền thống</p>
              </div>
              <div className="col-lg-4">
                <img src="https://cdn-icons-png.flaticon.com/512/651/651191.png" alt="" width="100" height="100"/>
                <h2>Uy tín</h2>
                <p>Dịch vụ được tin tưởng bởi khách hàng</p>
              </div>
            </div>  
          </div>
        }
        <br></br>
        <hr className="dash"/>
        <div className = "container" style={{backgroundColor:'rgba(0, 0, 0, 0.05)'}}>
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading" >Đặt xe</h2>
              <p className="lead">Nhanh chóng đặt một chiếc xe ưng ý thông qua Website hoặc Ứng dụng (App) của chúng tôi</p>
            </div>
            <div className="col-md-5">
              <img className="featurette-image img-fluid mx-auto"  alt="500x500" style={{width:'250px', height: '200px'}} src="https://cdn-icons-png.flaticon.com/512/5361/5361032.png"/>
            </div>
          </div>
          <hr/>
          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading" >Nhận xe</h2>
              <p className="lead">Nhận xe tại nhà hoặc các đại lý trong khu vực của chúng tôi</p>
            </div>
            <div className="col-md-5 order-md-1">
              <img className="featurette-image img-fluid mx-auto" alt="500x500" style={{width:'200px', height: '200px'}} src="https://cdn-icons-png.flaticon.com/512/3061/3061669.png"/>
            </div>
          </div>
          <hr/>
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading" >Tận hưởng</h2>
              <p className="lead">Tất cả các phương tiện của chúng tôi đều đạt chuẩn an toàn</p>
            </div>
            <div className="col-md-5">
              <img className="featurette-image img-fluid mx-auto"  alt="500x500" style={{width:'300px', height: '250px'}} src="https://cdn-icons-png.flaticon.com/512/171/171239.png"/>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer/>
  </>
  )
}
