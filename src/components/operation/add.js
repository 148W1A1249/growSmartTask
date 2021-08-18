import React from 'react';
import {Field,reduxForm} from 'redux-form';
import isValidEmail from "sane-email-validation";
import axios from "axios";
import { useHistory } from 'react-router-dom';

var gender = ["Male","Female","others"];
const validate = values =>{
    const errors = {};
    if(!values.UserName){
        errors.UserName = 'Required'
    }
    if(!values.Gender){
        errors.Gender = 'Required'
    }
    if(!values.Email){
        errors.Email = 'Required'
    }else if(!isValidEmail(values.Email)){
        errors.Email  = "Invalid Email"
    }
    if(!values.Phone){
        errors.Phone = 'Required'
    }else if(values.Phone.length>10){
        errors.Phone = 'only 10 element allowed'
    }
    if(!values.City){
        errors.City = 'Required'
    }
    if(!values.Pincode){
        errors.Pincode = 'Required'
    }else if(values.Pincode.length>6){
        errors.Pincode = 'only 6 element allowed'
    }
    return errors;
}
const createRenderr = render=> ({input, meta, label, ...rest})=>{
    return <div className="row mt-2">
        <div className="col-md-3 col-12">
            <label className="font-weight-bold">{label}:</label>
        </div>
        <div className="col-md-7 col-12">
            {render(input, label,rest)}
        </div>
        <div className="col-md-2 col-12">
            {meta.error && meta.touched && <span className="text-danger">* {meta.error}</span>}
        </div>
    </div>
}
const renderInput = createRenderr((input,label)=>{
    return <input className="form-control" {...input} placeholder={label} />
})
const renderSelect = createRenderr((input,label,{children})=>{
   return <select className="form-control" {...input} >{children}</select>
})
function ADDTab(props){
    const {handleSubmit} = props;   
    const history = useHistory(); 
    const showValues = (formValues)=>{
        console.log(formValues.UserName);
        axios({
            method: 'post',
            url: 'https://607432b1066e7e0017e794b3.mockapi.io/growSmart',
            data: {
                UserName:formValues.UserName,
                Gender:formValues.Gender,
                Email:formValues.Email,
                Phone:formValues.Phone,
                City:formValues.City,
                Pincode:formValues.Pincode,
            }
          })
          .then(response => {
            history.push("/");
          })
    }
return<>
<div className="">
        <form onSubmit={handleSubmit(showValues)}>
            <div className=" text-info">
                <h3 className="text-center mt-5 text-info"><u>Add User</u></h3>
                <div className="p-5" >
                    <Field  type="text" name="UserName" label="User Name" component={renderInput} />
                    <Field  type="text" name="Gender" label="Gender" component={renderSelect} >
                        {gender.map(((ele,ind)=>{
                            return <option key={ind} value={ele}>{ele}</option>
                        }))}
                    </Field>
                    <Field  type="text" name="Email" label="Email" component={renderInput} />
                    <Field  type="text" name="Phone" label="Phone" component={renderInput} />
                    <Field  type="text" name="City" label="City" component={renderInput} />
                    <Field  type="text" name="Pincode" label="Pincode" component={renderInput} />
                    

                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-info">Submit</button>
                    </div>
                </div>                
            </div>                
        </form>
   </div>
  
</>
}

export default reduxForm({
    form: "add-user",
    validate,
})(ADDTab);
