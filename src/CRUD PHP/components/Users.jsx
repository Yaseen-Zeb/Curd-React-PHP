import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {NavLink,} from 'react-router-dom';
const Users = () => {
   let [users,setUsers] = useState([])

   async function getData() {
        let res = await fetch("http://localhost/Api%20React/CRUD-API/add.php");
        let data = await res.json();
        setUsers(data.result);  
   }

   useEffect(()=>{
     getData();
   },[])

   async function remove(id) {
    let ajax = {
        method : "post",
        body : JSON.stringify({id:id})
    }
    let res = await fetch(`http://localhost/Api%20React/CRUD-API/add.php`,ajax);
    let data = await res.json();
     if (data.result == "seccess") {
        getData();
     }
}

   async function handeSearch(e) { 
    let name =  e.target.name;
    let value =  e.target.value;
    if (value != "") {
        let ajax = {
            method : "post",
            body : JSON.stringify({name:name,search:value})
        }
        let res = await fetch(`http://localhost/Api%20React/CRUD-API/add.php`,ajax);
        let data = await res.json();
         setUsers(data.result); 
    }else{
        getData();
    } 
}

  return (
    <>
     <div id="admin-content">
      <div className="container">
          <div className="row">
              <div className="col-md-10">
                  <h1 className="admin-heading">All Users</h1>
              </div>
              <div className="col-md-2">
                  <NavLink to={"./add-user"}  className="add-new" >add user</NavLink>
              </div>
             
             
              <div className="col-md-12">
                <div className='bg-primary mb-2 py-2'>
               <div className="form-group  w-50 m-auto">
                 <input type="text"className="form-control" name="search" placeholder='Search users...' onChange={handeSearch}/>
               </div>
               </div>
                  <table className="content-table">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Full Name</th>
                          <th>User Name</th>
                          <th>Address</th>
                          <th>Edit</th>
                          <th>Delete</th>
                          </tr>
                      </thead>
                      

                      <tbody>
                        {
                           users.map((user,i)=>
                                <tr key={i}>
                                <td>{user.id}</td>
                                <td>{user.fname}</td>
                                <td>{user.lname}</td>
                                <td>{user.address}</td>
                                <td className='edit'> <NavLink to={"./update-user/"+user.id} className='fa fa-edit' ><i ></i></NavLink></td>
                                <td className='delete'> <span style={{cursor:'pointer'}}  onClick={()=>remove(user.id)}  className='fa fa-trash-o' ><i ></i></span></td>
                                </tr>
                           )
                    }
                         
                      </tbody>
                  </table>
                  
              </div>
          </div>
      </div>
  </div>
    </>  
  )
}

export default Users
 

