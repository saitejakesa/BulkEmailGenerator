import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup, Input, Label, Spinner } from 'reactstrap'
import env from '../environment';

function Addperson() {
    let [email, setemail] = useState([]);
    let [name, setname] = useState([]);
    let [message,setMessage]=useState("")
    let [toggle,setToggle]=useState(false)
let handleLogin = async ()=>{
    
    setToggle(true)
    
    let res = await axios.post(`${env.apiurl}/users/todetails`,{
        email,
        name
    });
    if (res.data.statusCode === 200) {
        setToggle(false)
        setMessage(res.data.message)
        setTimeout(()=>{
         setMessage("")
       },3000)
    } else {
        setToggle(false)
      setMessage(res.data.message)
      setTimeout(()=>{
        setMessage("")
      },3000)
    }
}
  return (
    <div>
      <FormGroup>
    <Label for="exampleText">
      Name
    </Label>
    <Input
      id="exampleText"
      name="text"
      type="text"
      onChange={(e)=>setname(e.target.value)}
    />
  </FormGroup>
    <FormGroup className="formgroup2">
        <Label for="exampleEmail">To Email: </Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Email Address here"
          type="email"
          onChange={(e)=>setemail(e.target.value)}
        />
        </FormGroup>
        
    <Button color="success" onClick={()=>handleLogin()}>Submit</Button>
    {toggle?<Spinner animation="border" variant="primary" />:<></>}
    {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
    </div>
    
  )
}

export default Addperson