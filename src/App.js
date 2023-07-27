
import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Addtoemails from './Pages/Addtoemails';
import Addperson from './Pages/Addperson';
import Emailbody from './Pages/Emailbody';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { BulkEmailContext } from './Context';
import { useState } from 'react';
import Provider from './Provider';
import ContentVerify from './Pages/ContentVerify';



function App() {
  
  return (
    <Provider>
    <BrowserRouter>
    
    <Routes>
      
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/toemails' element = {<Addtoemails />}/>
        <Route path='/addproduct' element = {<Addperson />}/>
        <Route path='/emailbody' element = {<Emailbody />}/>
        <Route path='/content' element = {<ContentVerify />}/>
        <Route path='*' element={<Navigate to={'/login'}/>}/>
        
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
