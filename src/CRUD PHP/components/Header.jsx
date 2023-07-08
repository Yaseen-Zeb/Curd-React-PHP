import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import '../css/style.css'

const Header = () => {
  return (
    <>
      <div id="header-admin">
            <div className="container">
                <div className="row">
                   <div className="col-12">
                    <h1 className='text-center text-light' style={{fontWeight:'bold'}}>CRUD Using React & PHP</h1>
                   </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header
