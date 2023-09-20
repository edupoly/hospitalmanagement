import React, { useState } from 'react'
import { useGetAllHospitalsQuery } from '../../services/hospApi'

function AddBed() {
    var {isLoading:isHospitalsLoading,data:hopitals}=useGetAllHospitalsQuery();
    // var [newBed,setNewBed]=useState({
    //     bedStatus:'open',
    //     bedtype:"",
    //     bedPrice:0,
    //     patients:[]
    // })
    var [bedTypes,setBedTypes]=useState([])
    // var [selectedHospital,setSlectedHospital]=useState(null)
    function updateBedTypes(hn){
      setBedTypes(JSON.parse(hn).bedTypes);
    }
  return (
    <div className='border border-2 border-danger m-2 p-2'>
        <h1>AddBed</h1>
        {
            isHospitalsLoading && (<b>...wait</b>)
        }
        {
            !isHospitalsLoading && (
                <select onChange={(e)=>{updateBedTypes(e.target.value)}}>
                    <option value={null} disabled selected> Please select </option>
                    {
                        hopitals.map((h)=>{
                            return <option value={JSON.stringify(h)}>{h.hospitalName}</option>
                        })
                    }
                </select>
            )
        }
        {
            bedTypes.length>0 && (
                <select>
                    {bedTypes.map((bt)=>{
                        return <option value={JSON.stringify(bt)}>{bt.bedType}</option>
                    })}
                </select>
                
            )
        }
    </div>
  )
}

export default AddBed