import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Table } from "reactstrap";
import { BulkEmailContext } from "../Context";
import env from "../environment";

function Addtoemails() {
  let [data, setData] = useState([]);
  //const [toemails, settoemails] = useState([]);
  const {toemails, settoemails}=useContext(BulkEmailContext)
  const [state, setState] = useState(true);
  const navigate = useNavigate()
  let loadData = async () => {
    let res = await axios.get(`${env.apiurl}/users/allemail`);
    if (res.data.statusCode === 200) {
      setData(res.data.users);
    } else {
      alert(res.data.message);
    }
  };

  const addOrRemove =(email) =>{
    const newtoemails = [...toemails];
    const index = newtoemails.indexOf(email);
    if (index === -1) {
      newtoemails.push(email);
    } else {
      setState(!state);
      newtoemails.splice(index, 1);
    }
    settoemails(newtoemails);
    
  }
debugger
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <div>
        <h1 className="heading">Selection Of Reciepient Emails Page</h1>
        <p className="paragraph">
          Can Select the Reciepient emails for which you can send the mail.
        </p>
        <Table dark>
          <thead>
            <tr className="firstrow">
              <th>#</th>
              <th>Email</th>
              <th style={{textallign: 'center'}}>Reciepient</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.email}</td>
                  <td>
                    <Form>
                      <FormGroup switch>
                        <Input style={{textallign: 'left'}}
                          type="switch"
                          checked={state[i]}
                          onClick={() =>
                            
                            addOrRemove(e.email)
                            
                          }
                        />
                      </FormGroup>
                    </Form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="Buttons">
          <Button color="primary" onClick={() => loadData()}>
            Refresh
          </Button>
          <Button color="primary" onClick={()=>navigate(`/addproduct`)}>AddPerson</Button>
          <Button color="primary" onClick={()=>navigate(`/emailbody`)} >Next</Button>
        </div>
      </div>
    </>
  );
}

export default Addtoemails;
