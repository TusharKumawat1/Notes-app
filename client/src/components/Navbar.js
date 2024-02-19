import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
export default function Navbar() {
  let navigate=useNavigate();
  const handleLogout=()=>{
    navigate("/login")
    localStorage.removeItem('token')
  }
  return ( 

    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" >Cloudकर</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    {  localStorage.getItem("token")?<div className="navbar-nav">
    
        <a className="nav-link active" aria-current="page" href="/">Home</a>
        <Link className="nav-link" to="/about">About</Link> 

      </div>:""}
     { !localStorage.getItem("token")?
      <div className="btn-group btn-group-toggle d-flex justify-content-end " data-toggle="buttons">
  <Link to="/login"><button type="button" className="btn btn-outline-primary mx-2" >Login</button></Link>
  <Link  to="/signup"><button type="button" className="btn btn-outline-primary mx-2">Signup</button></Link>
  </div>: <button type="button" onClick={handleLogout} className="btn btn-outline-primary mx-2" >Logout</button>}
    </div>
  </div>
  
</nav>
    </div>
  )
}
