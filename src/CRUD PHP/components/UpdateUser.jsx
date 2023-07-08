import React from 'react'
import {useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddUser = () => {
    let [formData,setFormData] = useState({id: '', fname: '', lname: '', address: ''});
    let nagivate = useNavigate()
    let params = useParams();
    let id = params.id;
    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setFormData({...formData , [name]:value})
    }

    useEffect(()=>{
        getData();
      },[])
   

    async function getData() {
        let res = await fetch(`http://localhost/Api%20React/CRUD-API/add.php?id=${id}`);
        let data = await res.json();
        
         if (data.result == "error") {
            nagivate("/")
         }else{
            setFormData(...data.result); 
         }
   }

   async function handleSubmit(e) {
        e.preventDefault();
        let btn = document.querySelector(".btn");
        let alert = document.querySelector(".alert");
        btn .textContent = "Wait...";
        let ajax = {
            method : "post",
            body : JSON.stringify(formData)
        }
        let res = await fetch("http://localhost/Api%20React/CRUD-API/add.php",ajax);
        let data = await res.json();
        if (data.result == "success") {
            btn .textContent = "Save";
            alert.textContent = "Data updated successfully."
            alert.classList.remove("d-none");
            setTimeout(() => {
            alert.classList.add("d-none");
            nagivate("/")
            }, 2000);
        }else{
            nagivate("/");
        }
    }

  return (
    <>
 <div id="admin-content">
      <div className="container">
          <div className="row">
              <div className="col-md-12">
                  <h1 className="admin-heading">Add User</h1>
              </div>
              <div className="col-md-offset-3 col-md-6 m-auto">
                  <form onSubmit={handleSubmit} autoComplete="off">
                      <div className="form-group">
                          <label>First Name</label>
                          <input type="hidden" value={id} name="id" required />
                          <input value={formData.fname} onChange={handleChange} type="text"  name="fname" className="form-control" placeholder="First Name" required />
                      </div>
                          <div className="form-group">
                          <label>Last Name</label>
                          <input onChange={handleChange} type="text" value={formData.lname} name="lname" className="form-control" placeholder="Last Name" required />
                      </div>
                      <div className="form-group">
                          <label>Address</label>
                          <input onChange={handleChange} type="text" value={formData.address} name="address" className="form-control" placeholder="Address" required />
                      </div>
                      <div className="alert alert-primary mb-0 mt-2 py-1 text-center d-none" role="alert"></div>
                      <button name="save" className="btn btn-primary mt-2 w-100" >Save</button>
                  </form>
               </div>
           </div>
       </div>
   </div>
    </>
  )
}

export default AddUser
 
