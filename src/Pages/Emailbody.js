import axios from 'axios';
import React, {useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { BulkEmailContext } from '../Context';
import env from '../environment';

function Emailbody() {
  let [message,setMessage]=useState("")
  // let [subject,setsubject] =useState([])
  // let [body,setBody] = useState([])
  let [toggle,setToggle]=useState(false)
  const {fromemail,toemail,subject,setsubject,body,setBody,password,setPassword }=useContext(BulkEmailContext)
  const navigate = useNavigate()
let handleLogin = async ()=>{
    
    setToggle(true)
    
    let res = await axios.post(`${env.apiurl}/users/body`,{
        subject,
        body,
        password,
        fromemail,
        toemail

    });
    if (res.data.statusCode === 200) {
        setToggle(false)
        setMessage(res.data.message)
        setTimeout(()=>{
         setMessage("")
       },3000)
       navigate(`/content`)
    } else {
        setToggle(false)
      setMessage(res.data.message)
      setTimeout(()=>{
        setMessage("")
      },3000)
    }
}

  return(
  <div>
    <Form>
      <FormGroup className="formgroup1">
      <Label for="fromemal">From Email: </Label>
      <Input id="subject_input" name="text" value={fromemail} type="textarea"></Input>
      </FormGroup>
      <FormGroup className="formgroup1">
      <Label for="frompassword">Password: </Label>
      <Input id="subject_input" name="text" type="textarea"
      onChange={(e)=>setPassword(e.target.value)}/>
      </FormGroup>
    <FormGroup className="formgroup1">
      <Label for="subject">Subject: </Label>
      <Input id="subject_input" name="text" type="textarea"
      onChange={(e)=>setsubject(e.target.value)}/>
      </FormGroup>
    <FormGroup className="formgroup2">
      <Label for="Body">Body</Label>
      <Input id="company_input" name="text" type="textarea"
      onChange={(e)=>setBody(e.target.value)}/>
      </FormGroup>
    <Button onClick={()=>handleLogin()}>
      Next
</Button>
{toggle?<Spinner animation="border" variant="primary" />:<></>}
  {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
  </Form>
  </div>
  ) 
}

export default Emailbody