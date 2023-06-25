import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
       const {name,email,password} = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name,email,password}) 
          });
          const json = await response.json()
         
          if(json.success){
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Account created", "success")
            history.push("/")
          }
          else{
            props.showAlert("Invalid details", "danger")
          }
    }
    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    return (
        <>
        <h2 className='my-2'>Create an account</h2>
        <div className='container'>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name}onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"value={credentials.email}  onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"  value={credentials.password}onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword"  value={credentials.cpassword}onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-success">SignUp</button>
            </form>
        </div>
        </>
    )
}

export default SignUp
