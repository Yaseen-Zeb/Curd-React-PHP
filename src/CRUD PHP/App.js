import React from 'react'
import Header from './components/Header';
import Users from './components/Users';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import {HashRouter ,Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>

<HashRouter>
 <Header />
     <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/add-user' element={<AddUser />} />
        <Route path='/update-user/:id' element={<UpdateUser />} />
    </Routes>
    </HashRouter>
    </>
  )
}

export default App 
