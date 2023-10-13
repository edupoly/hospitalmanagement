import React from 'react'
import { Outlet,Link } from 'react-router-dom'

function AdminDashBoard() {
  return (
    <div>
        <h1>AdminDashBoard</h1>
        <Link to="addHospital"><button className='btn btn-success'>+ Add Hospital</button></Link>
        <Link to="addBed"><button className='btn btn-info'>+ Add Bed</button></Link>
        <Link to="discharge"><button className='btn btn-primary'>Discharge patient</button></Link>
        <Outlet></Outlet>
    </div>
  )
}

export default AdminDashBoard