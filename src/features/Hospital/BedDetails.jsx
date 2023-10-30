import React from 'react'
import { useGetHospitalDetailsByIdQuery,useAddBedsMutation,useLazyGetHospitalDetailsByIdQuery } from '../../services/hospApi'
import { useParams } from 'react-router-dom'
function BedDetails() {
    var p = useParams()
    //console.log(p)
    var x = useGetHospitalDetailsByIdQuery()
    console.log(x)
    var {isLoading,data} = useGetHospitalDetailsByIdQuery(p.id)
    console.log(data)
    const [ updatehsptl ] = useAddBedsMutation()
    const [ refresh ] = useLazyGetHospitalDetailsByIdQuery()
  // var [ubed,setubed] = React.useState()
   function Discharge(bedid){ 
    console.log(data)
    console.log(bedid)
    var temp = data.beds.map((bed)=>{
        if(bed.bedId===bedid){
            var tempPatients = bed.patients.map((patient)=>{
                if(patient.status==="ongoing"){
                    return {...patient,status:"discharged"}
                }
                else{
                    return{...patient}
                }
            })
            return {...bed,patients:[...tempPatients],bedStatus:"open"}
        }
        else{
            return bed
        }
    })
    var updatedhsptl = {...data,beds:[...temp]}
    console.log(updatedhsptl)
    updatehsptl({...updatedhsptl}).then(()=>{
        alert("patient discharged succesfully")
        refresh(p.id)
    })
}
return (
<div>
    <>
        <center>
        <div className='row'>
            <div className='col-md-2 col-lg-2'></div>
            <div className='col-md-8 col-lg-8'>
        <table className='table table-bordered table-sm py-10' cellPadding="15px">
            <tr> 
                <th>Bed ID</th>
                <th>Bed Type</th>
                <th>Patient Name</th>
                <th>Action</th>
            </tr>
        {
            isLoading && <h4>Loading...</h4>
        }
        {
            !isLoading && data.beds.map((bed)=>{
                if(bed.bedStatus==="occupied"){
                    //return <h4>{bed.bedtype}</h4>
                    return bed.patients.map((patient)=>{
                    return(
                        <tr className='table'>
                            <td>{bed.bedId}</td>
                            <td>{bed.bedtype}</td>
                            <td>{patient.name}</td>
                            <td><button type='submit' className='btn btn-warning' onClick={()=>{Discharge(bed.bedId)}}>Discharge</button></td>
                        </tr>

                    )
                })
            }
        })
        }
        </table> 
        </div>
        <div className='col-md-2 col-lg-2'></div>
        </div>
        </center>
        </>
        
    </div>
    )
}
export default BedDetails