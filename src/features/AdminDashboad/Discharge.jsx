import React from 'react'
import { Link } from 'react-router-dom'
import { useGetAllHospitalsQuery } from '../../services/hospApi'

function Discharge() {
    var {isLoading,data} = useGetAllHospitalsQuery()
  return (
    <center>
    <div className='border border-2 border-success m-2 p-2'>
        <h1>Discharge patient</h1>
        <>
        {
          isLoading && (<b>Please wait....</b>)
        }
        <ul className='d-flex flex-wrap'>
        {
          !isLoading && (
            data.map((hospital)=>{
              return <li className='w-25 p-2' style={{listStyle:'none'}}>
                <div className='border border-2 p-2'>
                <h3 className='text-center'>{hospital.hospitalName}</h3>
                <li>
                  <Link to={`details/${hospital.id}`}>Details</Link>
              </li>
                </div>
              </li>
            })
        

          )
}

        </ul>
        
        
        </>
        

          
        
    </div>
    </center>
    
  )
}

export default Discharge