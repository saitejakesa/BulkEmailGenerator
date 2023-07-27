import React, { useState } from 'react'
import { BulkEmailContext } from './Context'

function Provider(props) {
  let [fromemail,setfromEmail]=useState("")
  const [toemails, settoemails] = useState([]);
  let [subject,setsubject] =useState([])
  let [body,setBody] = useState([])
  let [password,setPassword] = useState([])
  return (
    <BulkEmailContext.Provider
      value={{
        toemails, settoemails,fromemail,setfromEmail,subject,setsubject,body,setBody,password,setPassword
      }}
    >
      {props.children}
    </BulkEmailContext.Provider>
  )
}

export default Provider