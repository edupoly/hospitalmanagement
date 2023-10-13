import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createRoot } from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminDashboard from './features/AdminDashboad/AdminDashBoard';
import AddHospital from './features/AdminDashboad/AddHospital';
import Home from './features/Home/Home';
import AddBed from './features/AdminDashboad/AddBed';
import HospitalDetails from './features/Hospital/HospitalDetails';
import Discharge from './features/AdminDashboad/Discharge';
import BedDetails from './features/Hospital/BedDetails';
//import Home from './Home/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path: "/admindashboard",
        element: <AdminDashboard></AdminDashboard>,
        children:[
          {
            path:"/admindashboard/addhospital",
            element: <AddHospital></AddHospital>
          },
          {
            path:"/admindashboard/addbed",
            element: <AddBed></AddBed>
          },
          {
            path:"/admindashboard/discharge",
            element: <Discharge></Discharge>
          }
        ]
      },
      {
        path:"/details/:id",
        element: <HospitalDetails></HospitalDetails>

      },
      {
        path:"admindashboard/discharge/details/:id",
        element: <BedDetails></BedDetails>

      },
      {
        path: "",
        element: <Home></Home>
      }
    ]
  }
])
  
    
  




createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
