import React,{useState,useEffect} from 'react';

import '../components/Success.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';

function Success (props) {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user-info'));
    const[bill,setDataBill] = useState(null);

    useEffect( async () => {
        fetch("http://127.0.0.1:8000/api/bills/"+props.match.params.id+"?customerId="+user.id).then(async result =>{
            const billResult = await result.json();
            setDataBill(billResult.data);
            console.log('1', billResult.data);        
        }).catch(error=> {
            console.log('2', error);
            window.location.href = "http://localhost:3000";        
        });  
    },[])

    async function confirm(){
         history.push('/');
     }
    return(
        <>
            {!_.isEmpty(bill) && (
               
                    <section className="container-success">
                <div className="main-content">
                    <div className="notice">
                        <img src="https://chungxe.vn/assets/images/icon/step3.png" alt=""/>
                        <h1>Đặt xe thành công</h1>
                        <p>MÃ HÓA ĐƠN CỦA BẠN</p>
                        <h4>{bill.id}</h4>
                    </div>
                    
                    <p className="label">THÔNG TIN KHÁCH HÀNG</p>
                    <div className="customer-info">
                        
                        <table>
                            <tr>
                                <td>Họ và tên</td>
                                <td>{user.fullName}</td>
                            </tr>
            
                            <tr>
                                <td>Chứng minh thư</td>
                                <td>{user.identityCard}</td>
                            </tr>
            
                            <tr>
                                <td>Số điện thoại</td>
                                <td>{user.telephone}</td>
                            </tr>
            
                            <tr>
                                <td>Địa chỉ</td>
                                <td>{user.address}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div className="car-info">
                        <p className="label">CHI TIẾT ĐẶT XE</p>
                        <table>
                            <tr>
                                <td>Tạo đơn lúc</td>
                                <td>{bill.createAt}</td>
                            </tr>

                            <tr>
                                <td>Trạng thái đơn</td>
                                <td>{bill.confirmStatus}</td>
                            </tr>

                            <tr>
                                <td>Trạng thái thanh toán</td>
                                <td>{bill.paymentStatus}</td>
                            </tr>

                            <tr>
                                <td>Tên xe</td>
                                <td>{bill.car.name}</td>
                            </tr>
            
                            <tr>
                                <td>Biển số xe</td>
                                <td>{bill.car.licensePlate}</td>
                            </tr>
            
                            <tr>
                                <td>Thời gian bắt đầu</td>
                                <td>{bill.startDate}</td>
                            </tr>
            
                            <tr>
                                <td>Thời gian kết thúc</td>
                                <td>{bill.endDate}</td>
                            </tr>

                            <tr>
                                <td>Tổng tiền</td>
                                <td>{bill.totalPrice}đ</td>
                            </tr>

                            <tr>
                                <td>Phương thức thanh toán</td>
                                <td>{bill.paymentMethod}</td>
                            </tr>
                        </table>
                    </div>

                    <div className="thank-you">
                        <p>Cảm ơn bạn đã sử dụng dịch vụ của Chungxe!</p>
                        <p>Chúc quý khách lên đường thượng lộ bình an và có trải nghiệm tốt nhất!</p>
                        <div className="button1" onClick={confirm}>Quay về trang chủ</div>
                    </div>
                    
                </div>
            </section>
            )}
        </>
            
        
    )
}
export default withRouter(Success);