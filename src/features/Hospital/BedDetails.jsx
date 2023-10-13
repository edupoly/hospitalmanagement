import React from 'react'
import { useGetHospitalDetailsByIdQuery } from '../../services/hospApi'
import { useParams } from 'react-router-dom'
function BedDetails() {
    var p = useParams()
    //console.log(p)
    var x = useGetHospitalDetailsByIdQuery()
    console.log(x)
    var {isLoading,data} = useGetHospitalDetailsByIdQuery(p.id)
    console.log(data)
    console.log(isLoading)
   // var [dischargePatient]=useDischargeMutation()
   //     console.log(dischargePatient)
   var [beds,setBeds] = React.useState([])

    function Discharge(){                              
        var tempBeds = data.beds;
        console.log(tempBeds)
        tempBeds=tempBeds.map((bed)=>{
            if(bed.bedStatus==="occupied"){
                alert('Hi')
                setBeds ({bedStatus:'open',patients:[{}]})
                //setBeds( {bedStatus:'open',patients:[{}]})
               // return ({bedStatus:"open"})
            }
        })
       
    }
   
  return (
    <div>
        <>
        <center>
        {
            isLoading && <h4>Loading...</h4>
        }
        {
            !isLoading && data.beds.map((bed)=>{
                if(bed.bedStatus==="occupied"){
                    return bed.patients.map((patient)=>{
                        return <h5><span>Email:</span>{patient.useremail}</h5>
                        
                    })
                }
               
            })
           
        }
         <button className="btn btn-warning" onClick={()=>{Discharge()}}>Discharge</button>
        
        

        </center>
        </>
        
    </div>
  )
}

export default BedDetails