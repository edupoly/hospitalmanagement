import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom';
import { useAddBedsMutation, useGetHospitalDetailsByIdQuery, useGetadminsQuery, useLazyGetHospitalDetailsByIdQuery } from '../../services/hospApi';
import _ from 'lodash';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../../app/userslice';
const provider = new GoogleAuthProvider();
function HospitalDetails() {
    const dispatch = useDispatch();
    var { isAdmin , user } = useSelector((state)=>{return state.u});
    var {data:admins} = useGetadminsQuery();
    var p = useParams();
    var {isLoading,data}=useGetHospitalDetailsByIdQuery(p.id);
    var [updateBeds]=useAddBedsMutation();
    var [getHospitalDetails]=useLazyGetHospitalDetailsByIdQuery();
    var [beds,setBeds] = useState(null);
    var [bedTypes,setBedTypes] = useState([]);
    var [selectedBed,setSelectedBed] = useState(-1)
    var [ isAdminBooking , setIsadminbooking ] = useState(null)
    var [ name , setName ] = useState(null);
    var [ mobile , setMobile ] = useState(null);
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
        if(user){
            if(isAdmin){
                setIsadminbooking(1);
            }
            if(!isAdmin){
                var temp = Object.values(beds).flat(1);
                temp = temp.map((b)=>{
                    if(b.bedId===selectedBed){
                        return {...b,patients:[...b.patients,{useremail:user.mailId,name:user.name,status:'ongoing'}]}
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
        }
        if(!user){
            signInWithPopup(auth,provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(token)
                var xyz = admins.filter((admin)=>{
                    return (admin.email===user.email)
                })
                console.log(xyz)
                var userDetails = {
                    name:user.displayName,
                    mailId:user.email,
                    image:user.photoURL
                }
                if(xyz.length>0){
                    dispatch(changeUser({isadmin:true,user:userDetails}));
                    setIsadminbooking(1)
                }
                if(xyz.length==0){
                    dispatch(changeUser({isadmin:false,user:userDetails}));
                    var temp = Object.values(beds).flat(1);
                    temp = temp.map((b)=>{
                        if(b.bedId===selectedBed){
                            return {...b,patients:[...b.patients,{useremail:user.email,name:user.displayName,status:'ongoing'}]}
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
    }
    function bookByadmin(){
        var temp = Object.values(beds).flat(1);
        temp = temp.map((b)=>{
            if(b.bedId===selectedBed){
                return {...b,patients:[...b.patients,{username:name,mobile:mobile,status:'ongoing'}]}
            }
            else{
                return b
            }
        })
        data={...data,beds:[...temp]}
        updateBeds(data).then(()=>{
            alert("Update Success...");
            getHospitalDetails(p.id);
            setIsadminbooking(null)
        })
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
                </div>
            )
        }
        {
        isAdminBooking &&
            <div className='border border-2 border-dark p-3 m-3 text-center'>
                <h4 className='text-danger'>Please enter patient details to proceed to booking</h4>
                <h4 className='p-0'>Patient Name:</h4>
                <input placeholder='patient name' type="text" onChange={(e)=>{setName(e.target.value)}} /><br/><br/>
                <h4>Patient Mobile:</h4>
                <input placeholder='patient mobile no.' type="number" onChange={(e)=>{setMobile(e.target.value)}} /><br/><br/>
                <button className='btn btn-warning' onClick={()=>{bookByadmin()}} >Book bed with these patient details</button>
            </div>
        }
    </div>
  )
}
export default HospitalDetails;