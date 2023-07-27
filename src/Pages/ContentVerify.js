import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button, FormGroup, Input, Label ,Form } from 'reactstrap'
import { BulkEmailContext } from '../Context'
import env from '../environment'

function ContentVerify() {
    const {fromemail,subject,body,password,toemails }=useContext(BulkEmailContext)
    let [message,setMessage]=useState("")
  let [toggle,setToggle]=useState(false)
    const handleClick = async e => {
      let res = await axios.post(`${env.apiurl}/users/sendemail`,{
        fromemail,
        subject,
        body,
        password,
        toemails
      })
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
    <Form>
      <FormGroup className="formgroup1">
      <Label for="fromemal">From Email: </Label>
      <Input id="subject_input" name="text" value={fromemail} type="textarea"></Input>
      </FormGroup>
      <FormGroup className="formgroup1">
      <Label for="Password">Password: </Label>
      <Input id="subject_input" name="text" value={password} type="textarea"></Input>
      </FormGroup>
      <FormGroup className="formgroup1">
      <Label for="toemail">To Email: </Label>
      <Input id="subject_input" name="text" value={toemails} type="textarea"></Input>
      </FormGroup>
    <FormGroup className="formgroup1">
      <Label for="subject">Subject: </Label>
      <Input id="subject_input" name="text" value={subject} type="textarea"/>
      </FormGroup>
    <FormGroup className="formgroup1">
      <Label for="Body">Body</Label>
      <Input id="company_input" name="text" value={body} type="textarea"/>
      </FormGroup>
    <Button onClick={()=>handleClick()}>
      SendEmail
</Button>
<p className="mb-3 mt-2" style={{color:"green",marginLeft:"57px"}}><b>{toggle}</b></p>
<p className="mb-3 mt-2" style={{color:"green",marginLeft:"57px"}}><b>{message}</b></p>
  </Form>
  </div>
   )
}

export default ContentVerify