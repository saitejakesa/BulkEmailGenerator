  
import axios from 'axios'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { BulkEmailContext } from '../Context';
import env from '../environment'

function Login() {

    let [password,setPassword]=useState("")
    let [toggle,setToggle]=useState(false)
    let [message,setMessage]=useState("")
    let navigate = useNavigate()
    
    const {fromemail,setfromEmail}=useContext(BulkEmailContext)
   
    let handleLogin = async ()=>{
    setToggle(true)
      let res = await axios.post(`${env.apiurl}/users/login`,{
        fromemail,
        password
      })
      if(res.data.statusCode===200)
      {
          setToggle(false)
         sessionStorage.setItem('token',res.data.token)
         navigate('/toemails')
      }
      else
      {
        setToggle(false)
        setMessage(res.data.message)
        setTimeout(()=>{
          setMessage("")
        },3000)
  
      }
    }
    return <div>
      <div className="login-wrapper">
        <h1>Welcome to App</h1>
        <p>Login to Continue</p>
      </div>
      <div className='login-main-wrapper'>
        <Form>
          <FormGroup className="mb-3">
            <Label>Email address</Label>
            <Input type="email" placeholder="Enter email" onChange={(e)=>setfromEmail(e.target.value)}/>
          </FormGroup>
  
          <FormGroup className="mb-3">
            <Label>Password</Label>
            <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          </FormGroup>
  
          <Button variant="primary" onClick={()=>handleLogin()}>
            Submit
          </Button>
          <Button variant="secondary" onClick={()=>navigate(`/signup`)}>
            SignUp
          </Button>
        </Form>
        {toggle?<Spinner animation="border" variant="primary" />:<></>}
        {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
      </div>  
    </div>

}

export default Login