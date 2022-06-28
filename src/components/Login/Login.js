import React, { useState} from 'react'
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'
const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const [isLoading, setLoading] = useState(false);
    let history = useNavigate('/');
    const onChange = (e) => {
        setcredentials(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!credentials.email) {
    
        } else if (!credentials.password) {
            
        } else {
            const response = await fetch('http://localhost:5000/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            console.log(json)
            if (json === false) {
        
            } else {
                localStorage.setItem('token', json.token)
               
                history('/')
            }
        }
        setLoading(false);
    }
    return (
        <div className='center'>
            <form className='login' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input name="email" type="email" value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" type="password" value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <a href='/signup'>Don't have an account ?</a>
                <br></br>
                <button type="submit" className="bs btn btn-dark">Login</button>
            </form>
        </div>);
}
export default Login;



