import React,{useState,useEffect} from 'react';

import '../components/CarDetail.css';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";

function CarDetail (props) {
    const moment = require('moment');
    localStorage.removeItem('bill');
    const[data,setData] = useState([]);
    const[cate,setCate] = useState([]);
    const[paymentMethod,setPaymentMethod] = useState("");
    const [sDate, setSDate] = useState(new Date());
    const [eDate, setEDate] = useState(new Date());
    const user = JSON.parse(localStorage.getItem('user-info'));
    const history = useHistory();
    const today = new Date();
     useEffect( async () => {
        let result = await fetch("http://127.0.0.1:8000/api/cars/"+props.match.params.id);  
        result = await result.json(); 
        if(result.data.status == "IA") {
            history.push("/book")
        }
        setCate(result.data.category);
        setData(result.data);
    },[])
    let day = convertMsToHM(eDate - sDate);
    let hours = convertMsToHours(eDate - sDate, day);
    let price = data.price;
    let carId = props.match.params.id;
    let customerId = user.id;

    if(eDate<sDate) 
    {
        day = 0;
        hours = 0;
    } else {
        day = day;
    }

    let totalPrice = day*price + Math.floor(price/24)*hours;
    let confirmStatus = "pending";

    async function addBill() {
        
       if(eDate < sDate || sDate < today ) {
           alert('Thời gian đặt xe không hợp lệ');
       }
       else if(day>5) {
        alert('Thời gian thuê xe không được quá 5 ngày');  
       }
       else {
            if (paymentMethod == 0) {
                alert('Vui lòng chọn hình thức thanh toán'); 
            }
            let paymentStatus = "unpaid";

            // if(paymentMethod == "Cash") {
            //     paymentStatus = "unpaid";
            // } 

            localStorage.getItem('user-info');
            let startDate = sDate.toISOString().split('T')[0];
            let endDate = eDate.toISOString().split('T')[0];

            let item={paymentStatus,confirmStatus, paymentMethod, totalPrice, startDate, endDate,carId, customerId};
           
            JSON.stringify(item);
            

            let result= await fetch("http://127.0.0.1:8000/api/bills", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept':'application/json'
                },
                body: JSON.stringify(item)
                
            });
            result = await result.json();
            if(result.error_code == 0) {
                localStorage.setItem("bill",JSON.stringify(result.data));
                history.push("/success/"+result.data.id);
            }
            else {
                alert('Có lỗi xảy ra vui lòng thử lại');
            }
       }
    }

    function convertMsToHM(milliseconds) {
        let hours = Math.floor(milliseconds / 86400000);
        hours = hours % 24;
        return hours;
    }
    function convertMsToHours(milliseconds, day) {
        if(day == 0) {
            return  Math.floor(milliseconds / 3600000);
        }
        else {
            return Math.floor((milliseconds - day*86400000) / 3600000);
        }
    }
    
    return(
        <>
            <Heading/>
            <main className="flex-container-car-detail">
                <div className="main-content-car-detail row">
                        <div className="top-content-car-detail">
                            <img className="pro-img" src={data.image64} alt="vinfast-fadil-mau-trang"/>
                            <div className="pro-info">
                                
                                    <h2>{data.name}</h2>
                                    <div className="info-list">
                                        <div className="info-list-item"><img src="https://icons.iconarchive.com/icons/icons8/android/512/Editing-Bg-Color-icon.png" style={{width : "20px", margin:"10px"}}/>Màu {data.color}</div>
                                        <div className="info-list-item"><img src="https://cdn-icons-png.flaticon.com/512/290/290081.png" style={{width : "30px", margin:"10px"}}/>Biển {data.licensePlate}</div>
                                        <div className="info-list-item"><img src="https://www.seekpng.com/png/detail/787-7877997_png-file-seat-icon-png.png" style={{width : "20px", margin:"10px"}}/>{data.seatNumber} Chỗ</div>
                                        <div className="info-list-item"><img src="https://www.seekpng.com/png/detail/91-919510_sedan-svg-png-icon-free-download-sedan-car.png" style={{width : "40px", margin:"10px"}}/>Hạng {cate}</div>
                                    </div>
                                
                            </div>
                        </div>

                    <div className="bottom-content-car-detail">
                        <div className="bottom-content-item">
                            <h2>TÍNH NĂNG</h2>
                            <div className="item-list">
                                <div className="item-list-col">
                                    <p><img src="https://icon-library.com/images/da573c8d9d.png" style={{width : "20px", margin:"10px"}}/>Điều hòa (A/C)</p>
                                    <p><img src="https://icon-library.com/images/da573c8d9d.png" style={{width : "20px", margin:"10px"}}/>Khe cắm USB</p>
                                </div>
                                <div className="item-list-col">
                                    <p><img src="https://icon-library.com/images/da573c8d9d.png" style={{width : "20px", margin:"10px"}}/>Định vị (GPS)</p>
                                </div>
                                <div className="item-list-col">
                                    <p><img src="https://icon-library.com/images/da573c8d9d.png" style={{width : "20px", margin:"10px"}}/>Bluetooth</p>
                                </div>
                            </div>
                        </div>

                        <div className="bottom-content-item">
                            <h2>CHẤP NHẬN THANH TOÁN</h2>
                            <div className="item-list">
                                <div className="item-list-col">
                                    <p><img src='https://static.thenounproject.com/png/2247068-200.png' style={{width : "50px", margin:"10px"}}/>Thanh toán bằng tiền mặt</p>
                                    <p><img src='https://www.pikpng.com/pngl/b/71-718009_bank-free-download-png-icon-bank-logo-png.png' style={{width : "30px", margin:"10px 10px 20px"}}/>Thanh toán qua chuyển khoản ngân hàng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="main-sidebar-car-detail row">
                    <div className="rent-time">
                        <h2>Thời gian thuê xe</h2>
                        <p>Ngày bắt đầu</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Ngày bắt đầu"
                                    value={sDate}
                                    onChange={(sDate) => {
                                        setSDate(sDate);
                                    }}
                                />
                            </LocalizationProvider>
                        <p>Ngày kết thúc</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Ngày kết thúc"
                                    value={eDate}
                                    onChange={(eDate) => {
                                        setEDate(eDate);
                                    }}
                                />
                            </LocalizationProvider>
                    </div>

                    <div className="rent-method">
                        <h2>Phương thức thanh toán</h2>
                    </div>
                    <div className="form-group">
                        <select className="form-control" onChange={(e)=>setPaymentMethod(e.target.value)}>
                            <option value="0" defaultValue hidden>Thanh toán</option>
                            <option value="Cash">Tiền mặt</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>
                    {paymentMethod == "Online" ? 
                        <div className="bank">
                            <p>Thông tin chuyển khoản : 22210004998593-BIDV</p>
                            <p>Nội dung chuyển khoản : Họ và tên-SĐT-Tên xe-Biển số-Ngày thuê-Ngày trả</p>
                            <i><strong>Vui lòng chuyển khoản trong vòng 24h</strong></i>
                        </div> : <></>  
                    }                
                    <div className="rent-price">
                        <h2>Chi tiết giá</h2>
                        <p>Đơn giá: {price? price.toLocaleString(): 0} đ</p>
                        <p>Thời gian thuê : {day} ngày {hours} giờ </p>
                        <p>Tổng tiền: {totalPrice.toLocaleString()} đ </p>
                        <i><strong>Vui lòng nhận xe tại cửa hàng</strong></i>
                    </div>
                    
                    <div className="button">
                        <a className="button" onClick={addBill}>ĐẶT NGAY</a>
                    </div>           
                </aside>
            </main>
            {/* <Footer/> */}
        </>
    )
}

export default withRouter(CarDetail);