import React from 'react';
import {Field,reduxForm} from 'redux-form';
import axios from "axios";
import { useHistory } from 'react-router-dom';

var gender = ["Male","Female","others"];

const createRenderr = render=> ({input, meta, label,data, ...rest})=>{
    return <div className="row mt-2">
        <div className="col-md-3 col-12">
            <label className="font-weight-bold">{label}:</label>
        </div>
        <div className="col-md-7 col-12">
            {render(input, label,data,rest)}
        </div>
        <div className="col-md-2 col-12">
            {meta.error && meta.touched && <span className="text-danger">* {meta.error}</span>}
        </div>
    </div>
}
const renderInput = createRenderr((input,label,data)=>{
    return <input  className="form-control" {...input} placeholder={data} />
})
const renderSelect = createRenderr((input,label,data,{children})=>{
   return <select className="form-control" {...input} >{children}</select>
})
function DeleteForm(props){
    const {handleSubmit,data,Person_id} = props;   
    const history = useHistory(); 
    const showValues = (formValues)=>{
        axios({
            method: 'DELETE',
            url: `https://607432b1066e7e0017e794b3.mockapi.io/growSmart/${Person_id}`
          })
          .then(response => {
            history.push("/");
          })
    }
return<>
<div className="">
        <form onSubmit={handleSubmit(showValues)}>
            <div className=" text-info">
                <h3 className="text-center mt-5 text-info"><u>Update User</u></h3>
                <div className="p-5" >
                    <Field data={data.UserName}  type="text" name="UserName" label="User Name" component={renderInput} />
                    <Field data={data.Gender}  type="text" name="Gender" label="Gender" component={renderSelect} >
                        {gender.map(((ele,ind)=>{
                            return <option key={ind} value={ele}>{ele}</option>
                        }))}
                    </Field>
                    <Field  data={data.Email} type="text" name="Email" label="Email" component={renderInput} />
                    <Field data={data.Phone} type="text" name="Phone" label="Phone" component={renderInput} />
                    <Field data={data.City} type="text" name="City" label="City" component={renderInput} />
                    <Field data={data.Pincode} type="text" name="Pincode" label="Pincode" component={renderInput} />
                    

                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-info">Delete</button>
                    </div>
                </div>                
            </div>                
        </form>
   </div>
  
</>
}

export default reduxForm({
    form: "update-user"
})(DeleteForm);
