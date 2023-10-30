import React, { useState } from 'react'
import { useAddBedsMutation, useGetAllHospitalsQuery } from '../../services/hospApi'

function AddBed() {
    var [bedCount,setBedCount]=useState(0);
    var [bedPrice,setBedPrice]=useState(0);
    var [selectedBedType,setSelectedBedType]=useState('');
    var {isLoading:isHospitalsLoading,data:hopitals}=useGetAllHospitalsQuery();
    var [addBedsToDB] = useAddBedsMutation();

    var [selectedHospital,setSelectedHospital]=useState(null)

    function saveBed(){
        var newbeds = [];
        // console.log("selectedHospital::",selectedHospital)
        var numBeds=selectedHospital.beds.filter(b=>b.bedtype===selectedBedType).length;
        for(var i=0;i<=bedCount-1;i++){
            var newBed={
                bedStatus:'open',
                bedtype:selectedBedType,
                bedPrice,
                patients:[],
                bedId:`${selectedBedType+(numBeds+i+1)}`
            }
            newbeds.push(newBed);
        }
        var latestHospitalDetails = {...selectedHospital,beds:[...selectedHospital.beds,...newbeds]};
        setSelectedHospital({...selectedHospital,beds:[...selectedHospital.beds,...newbeds]})

        addBedsToDB(latestHospitalDetails)
    }
  return (
    <div className='border border-2 border-danger m-2 p-2'>
        <h1>AddBed</h1>
        {
            isHospitalsLoading && (<b>...wait</b>)
        }
        {
            !isHospitalsLoading && (
                <>
                <select onChange={(e)=>{setSelectedHospital(JSON.parse(e.target.value))}}>
                    <option value={null} disabled selected> Please select </option>
                    {
                        hopitals.map((h)=>{
                            return <option value={JSON.stringify(h)}>{h.hospitalName}</option>
                        })
                    }
                </select>
                <br />
                </>
            )
        }
        {
        selectedHospital && selectedHospital.bedTypes.length>0 && (
                <>
                    <select onChange={(e)=>{setSelectedBedType(e.target.value)}}>
                        <option value={null} disabled seleted>Please Select</option>
                        {selectedHospital.bedTypes.map((bt)=>{
                            return <option value={bt.bedType}>{bt.bedType}</option>
                        })}
                    </select>
                    <br />
                    <input type="number" placeholder="Enter Bed Count" onChange={(e)=>{setBedCount(e.target.value)}}/>
                    <br />
                    <input type="number" placeholder="Enter Bed Price" onChange={(e)=>{setBedPrice(e.target.value)}}/>
                    <br />
                </>       

            )
        }

        <br />
        <button onClick={()=>{saveBed()}}>Save Beds</button>
    </div>
  )
}

export default AddBed