import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = (props) => {
    const [credentials,setCredentials] =useState({email:"", password:""});
   let history = useHistory()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
                "Content-Type":"application/json"
                //"auth-token": localStorage.getItem('token');
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}), 
          });
          const json = await response.json()
          
          if(json.success){
            //save and redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert("You are logged in", "success")
            history.push("/")
          }
          else{
            props.showAlert("Invalid Credentials", "danger")
          }
    }
    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    return (
        <>
        <h2 className='my-2'>Login</h2>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email}  onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange}   id="password" name="password"/>
                </div>
                <button type="submit" className="btn btn-success" >Login</button>
            </form>
        </div>
        </>
    )
}


export default Login
