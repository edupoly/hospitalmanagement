import { Formik } from 'formik';
import React, { useState } from 'react'
import { bedTypes } from '../../constants';
import { useAddHospitalMutation } from '../../services/hospApi';
function AddHospital() {
    var [newbedtype,setNewBedtype]=useState({
        bedType:'',
        price:0
    })
    var [addedBedTypes,setAddedBedTypes] = useState([])
    var [addHospital]=useAddHospitalMutation()
    function addBedType(){
        setAddedBedTypes([...addedBedTypes,newbedtype])
    }
  return (
    <div className='border border-2 border-info m-2 p-2'>
        <h2>AddHospital</h2>
        <Formik
            initialValues={
                { 
                    hospitalName: '', 
                    image: '' ,
                    area:'',
                    reviews:[],
                    bedTypes:[],
                    beds:[]
                }
            }
            
            onSubmit={(values)=>{
                values.bedTypes=[...addedBedTypes]
                addHospital(values).then((res)=>{
                    console.log("res::",res)
                })
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="hospitalName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.hospitalName}
                    placeholder='Enter Hospital Name'
                />
                <br />
                <input
                    type="text"
                    name="image"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.image}
                    placeholder='Enter Hospital Image Url'
                />
                <br />
                <input
                    type="text"
                    name="area"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.area}
                    placeholder='Enter Hospital Location'
                />
                <br />
                <ul>
                    {
                        addedBedTypes.length>0 && (<u>selected bedtypes</u>)
                    }
                    {
                        addedBedTypes.length>0 && addedBedTypes.map((a)=>{
                            return <li>
                                <i>{a.bedType}</i> &nbsp;
                                <b>{a.price}</b> &nbsp;
                            </li>
                        })
                    }
                </ul>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                + Bed Type
                </button>
                <br />
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Add Bed Type with Price</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <label htmlFor="">Select Bed Type:</label>
                            <select onChange={(e)=>{setNewBedtype({...newbedtype,bedType:e.target.value})}}>
                                <option value={null} disabled selected>Please Select</option>
                                {
                                    bedTypes.map((bedtype)=>{
                                        return <option value={bedtype}>{bedtype}</option>
                                    })
                                }
                            </select>
                            <br />
                            <label htmlFor="">Set The Price:</label>
                            <input type="text" placeholder='Enter the price' onChange={(e)=>{setNewBedtype({...newbedtype,price:e.target.value})}}/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onClick={()=>{addBedType(values)}}>Add Bed Type</button>
                        </div>
                        </div>
                    </div>
                </div>

                <button type="submit">
                    Submit
                </button>
                
                </form>
            )}
            </Formik>

    
</div>
  )
}

export default AddHospital