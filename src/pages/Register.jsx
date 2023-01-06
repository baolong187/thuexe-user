import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import "../components/Login.css";

function Register() {
    const[fullname,setFullName] = useState("");
    const[telephone,setTelephone] = useState("");
    const[address,setAddress] = useState("");
    const[identityCard, setIdentityCard] = useState("");
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[email,setEmail] = useState("");
    const history = useHistory();
    
     async function login(){
        if(fullname == "" || telephone=="" || address=="" || identityCard=="" || username=="" || password=="" || email=="") {
            alert('Vui lòng nhập đầy đủ thông tin');
        }
        else{
            let item={fullname, email, identityCard, telephone, address, username, password};
            let result= await fetch("http://127.0.0.1:8000/api/customer/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept':'application/json'
                },
                body: JSON.stringify(item)
                
            });
    
            result = await result.json();

            if(result.error_code !== 0) {
                alert('Tài khoản đã tồn tại');
            }
            else {
                localStorage.setItem("user-info",JSON.stringify(result.data));
                history.push("/");
            }
        } 
    }

    return(
        <div className="container">
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                    <div className="card-body p-4 p-sm-5">
                        <h5 className="card-title text-center mb-5 fw-light fs-5 fw-bold">ĐĂNG KÝ</h5>
                        <form>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="name@example.com" onChange={(e)=>setFullName(e.target.value)}/>
                                <label>Họ và tên</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
                                <label>Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="name@example.com" onChange={(e)=>setAddress(e.target.value)}/>
                                <label>Địa chỉ</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="name@example.com" onChange={(e)=>setTelephone(e.target.value)}/>
                                <label>Số điện thoại</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="name@example.com" onChange={(e)=>setIdentityCard(e.target.value)}/>
                                <label>Số chứng minh thư</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="name@example.com" onChange={(e)=>setUsername(e.target.value)}/>
                                <label>Tài khoản</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingPassword"
                                    placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                <label>Mật khẩu</label>
                            </div>
                            <a className="register-link" onClick={()=>{history.push('/login')}}>Đăng nhập</a>
                            <div>
                                <div onClick={login} className="btn-login">Đăng ký</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}
export default Register