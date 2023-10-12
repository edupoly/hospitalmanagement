import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAddBedsMutation, useGetHospitalDetailsByIdQuery, useLazyGetHospitalDetailsByIdQuery } from '../../services/hospApi';
import _ from 'lodash';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useGetAlladminsQuery } from '../../services/hospApi';
import Form from '../../shared/Form';
const provider = new GoogleAuthProvider();
function HospitalDetails() {
    var p = useParams();
    var {isLoading,data:admin}=useGetAlladminsQuery();
    console.log(admin);
    var navigat=useNavigate()
    var {isLoading,data}=useGetHospitalDetailsByIdQuery(p.id);
    var [updateBeds]=useAddBedsMutation()
    var [getHospitalDetails]=useLazyGetHospitalDetailsByIdQuery();
    var [beds,setBeds] = useState(null)
    var [bedTypes,setBedTypes] = useState([])
    var [selectedBed,setSelectedBed] = useState(-1)
    useEffect(()=>{
        if(data){
            var bedsByCategory = _.groupBy(data.beds,"bedtype");
            console.log(bedsByCategory)
            setBeds(bedsByCategory)
            var temp =[]
            for(var k in bedsByCategory){
                temp.push(k)
            }
            setBedTypes([...temp])
        }
    },[data])
    
    function occupyBed(bid){
        console.clear();
        console.log(data)
        setSelectedBed(bid)
        var tempBeds = data.beds;
        tempBeds=tempBeds.map((bed)=>{
            if(bed.bedId===bid){
                return {...bed,bedStatus:'occupied'}
            }
            else{
                return bed;
            }
        })
        console.log("tempBeds::",tempBeds)
        var bedsByCategory = _.groupBy(tempBeds,"bedtype");
        setBeds(bedsByCategory)
    }
    function updateHospital(){
        
        const auth = getAuth();
        signInWithPopup(auth,provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            
            console.clear();
            console.log(beds)
            console.log(user)
            console.log(token)
           var x=admin.filter((s)=>{
                return(s.email==user.email);})
                console.log(x>0)
                if(x){
                    alert("please enter another email")
                    navigat(`form`)
                }
                else{
            var temp = Object.values(beds).flat(1);
            temp = temp.map((b)=>{
                if(b.bedId===selectedBed){
                    return {...b,patients:[...b.patients,{useremail:user.email,token:user.accessToken}]}
                }
                else{
                    return b
                }
            })
            data = {...data,beds:[...temp]}
            updateBeds(data).then(()=>{
                alert("Update Success...");
                getHospitalDetails(p.id)
            })
        }
        }).catch((error) => {
            console.log(error)
        });

        
    }   
  return (
    <div>
        <h1>HospitalDetails</h1>
        {
            isLoading && ("please wait")
        }
        {
            !isLoading && (
                <div>
                    <h1>{data.hospitalName.toUpperCase()}</h1>
                    <ul>
                        {
                            bedTypes.map((t)=>{
                                return <li>
                                            {t}-{beds[t].length}
                                            <br />
                                            {
                                                beds[t].map((bed)=>{
                                                    return (
                                                            <>
                                                            {bed.bedStatus==='open'&&<i class="bi bi-clipboard h3 m-2" onClick={()=>{occupyBed(bed.bedId)}}></i>}
                                                            {bed.bedStatus==='occupied'&&<i class="bi bi-clipboard-fill h3 m-2" onClick={()=>{occupyBed(bed.bedId)}}></i>}

                                                            </>)
                                                })
                                            }
                                        </li>
                            })
                        }
                    </ul>
                    <button onClick={()=>{updateHospital()}}>Book IT</button>
                    <Outlet></Outlet>
                </div>
            )
        }
    </div>
  )
}

export default HospitalDetails