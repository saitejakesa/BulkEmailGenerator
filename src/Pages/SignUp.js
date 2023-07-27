import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import './FromList.css';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import env from "../environment";
function SignUp() {
    const navigate = useNavigate()
    let [fromemail, setemail] = useState([]);
    let [name, setname] = useState([]);
    let [password, setpassword] = useState([]);
    let [companyname, setcompanyname] = useState([]);
    let [message,setMessage]=useState("")
    let [toggle,setToggle]=useState(false)
let handleLogin = async ()=>{
    
    setToggle(true)
    
    let res = await axios.post(`${env.apiurl}/users/signup`,{
        name,
        fromemail,
        password,
        companyname
    });
    if (res.data.statusCode === 200) {
        setToggle(false)
        setMessage(res.data.message)
        setTimeout(()=>{
         setMessage("")
         navigate("/login")
       },3000)
    } else {
        setToggle(false)
      setMessage(res.data.message)
      setTimeout(()=>{
        setMessage("")
      },3000)
    }
}

  return <div>
    <Form>
    <FormGroup className="formgroup1">
        <Label for="name">Name: </Label>
        <Input id="name_Input" name="text" type="textarea"
        onChange={(e)=>setname(e.target.value)}/>
    </FormGroup>    
  
      <FormGroup className="formgroup2">
        <Label for="exampleEmail">From Email: </Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Email Address here"
          type="email"
          onChange={(e)=>setemail(e.target.value)}/>
          </FormGroup>
          <FormGroup className="formgroup3">
        <Label for="examplePassword">Password:</Label>
        <Input
          id="password"
          name="password"
          placeholder="Enter Password here"
          type="email"
          onChange={(e)=>setpassword(e.target.value)}/>
          </FormGroup>
      <FormGroup className="formgroup3">
        <Label for="company">Company Name: </Label>
        <Input id="company_input" name="text" type="textarea"
        onChange={(e)=>setcompanyname(e.target.value)}/>
        </FormGroup>
      <Button onClick={()=>handleLogin()}>
        Submit
  </Button>
  {toggle?<Spinner animation="border" variant="primary" />:<></>}
    {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
    </Form>
</div>
}

export default SignUp
