import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import "../components/Login.css";

function UserLogin() {

    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const history = useHistory();
    
    useEffect(()=> {
        if(localStorage.getItem('user-info')) {
            history.push("/")
        }
    },[])

     async function login(){
        
        let item={username, password};
        let result= await fetch("http://127.0.0.1:8000/api/customer/login", {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
                 'accept':'application/json'
            },
            body: JSON.stringify(item)
            
        });
        
        result = await result.json();

        if(result.error_code !== 0) {
            alert('Sai mật khẩu hoặc tài khoản');
        }
        else {
            localStorage.setItem("user-info",JSON.stringify(result.data));
            history.push("/");
        } 
    }

    return(
        <div className="container">
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                    <div className="card-body p-4 p-sm-5">
                        <h5 className="card-title text-center mb-5 fw-light fs-5 fw-bold">ĐĂNG NHẬP</h5>
                        <form>
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
                            <a className="register-link" onClick={()=>{history.push('/register')}}>Chưa có tài khoản? Đăng ký ngay!</a>
                            <div>
                                <div onClick={login} className="btn-login">Đăng nhập</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}
export default UserLogin