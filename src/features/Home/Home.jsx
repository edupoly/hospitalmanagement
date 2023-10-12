import React from 'react'
import { useGetAllHospitalsQuery } from '../../services/hospApi'
import { Link } from 'react-router-dom'

function Home() {
  var {isLoading,data}=useGetAllHospitalsQuery()
  return (
    <div>
        <h1>Home</h1>
        {
          isLoading && (<b>Please wait....</b>)
        }
        <ul className='d-flex flex-wrap p-2'>
          {
            !isLoading && (
              data.map((hospital)=>{
                return <li className='w-25 p-2' style={{listStyle:'none'}}>
                  <div className=' border border-2 p-2'>
                    <h3 className='text-center'>{hospital.hospitalName.toUpperCase()}</h3>
                    <img src={hospital.image} width="100%" height="150px" className="" alt="" />
                    <br />
                    <li>
                      <b>Total Beds:{hospital.beds.length}</b>
                      <br />
                      <Link to={`details/${hospital.id}`}>Details</Link>
                    </li>
                  </div>
                  </li>
              })
            )
          }
        </ul>
    </div>
  )
}

export default Home