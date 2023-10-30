import React from 'react';
import { Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';
import '../App.css';
import { useGetadminsQuery } from '../services/hospApi';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../app/userSlice';
const provider = new GoogleAuthProvider();

function Header() {
  var { isAdmin , user } = useSelector((state)=>{return state.u})
  var { data } = useGetadminsQuery();
  const dispatch = useDispatch();

  function login(){
    signInWithPopup(auth,provider)
    .then((res)=>{
        var userDetails = {
            name: res.user.displayName,
            mailId: res.user.email,
            image: res.user.photoURL
        }
        var admns = data.filter((mail)=>{
          return (mail===userDetails.mailId)
        })
        if(admns.length===0){
          dispatch(changeUser({isadmin:false,user:userDetails}))
        }
        if(admns.length>0){
          dispatch(changeUser({isadmin:true,user:userDetails}))
        }
    }).catch((err)=>{
        console.log(err)
    })
  }
  function logOut(){
    dispatch(changeUser({isadmin:false,user:null}))
    alert('logged out sucessfully')
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
            <div className="container-fluid">
                <Link className="navbar-brand">HSP</Link>
                {
                  isAdmin &&
                  <div style={{marginLeft:"350px"}} className="navbar-nav">
                    <Link className="nav-link" to="/admindashboard">Admin DashBoard</Link>
                  </div>
                }
                {
                  !user &&
                  <button className='btn' onClick={()=>{login()}}>
                    <span>Login</span>&nbsp;
                    <i className="bi bi-box-arrow-in-right"></i>
                  </button>
                }
                    {
                        user &&
                        <div className="dropdown">
                            <span className='text-white' >Howdy, {user.name}</span>
                            <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img style={{"width":"25px","height":"25px","border-radius":"50%"}} src={user.image} alt="" />
                            </button>
                            <ul className="dropdown-menu profile-menu" aria-labelledby="dropdownMenuButton1">
                              <li><button className="dropdown-item" onClick={()=>{logOut()}}>Logout</button></li>
                            </ul>
                        </div>
                    }
            </div>
        </nav>
    </div>
  )
}

export default Header