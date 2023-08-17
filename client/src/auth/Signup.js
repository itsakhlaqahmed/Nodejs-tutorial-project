import React, {useState} from "react";
import {Navigate} from 'react-router-dom';
import Layout from "../core/Layout";
import axios from 'axios';
import { isAuth } from "./helper";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const Signup = () => {

    const [values, setValues] = useState({
        name: 'abc',
        email: '',
        password: '',
        buttonText: 'Submit'
    })

    const {name, email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'})

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {name, email, password}
        }).then(response => {
            console.log(response)
            setValues({...values, name:'', email:'', password: '', buttonText: 'Submitted'})
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log('SIGNUP ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.response.data.error);

        })
    }

    const signupForm = () => (
        <form >
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" value={name} className="form-control" onChange={handleChange('name')}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" value={email} className="form-control" onChange={handleChange('email')}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" value={password} className="form-control" onChange={handleChange('password')}/>
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
        
    )

    return (
    <Layout>
        <div className="col-d-6 offset-md-3">
            <ToastContainer />
            {isAuth() ? <Navigate replace to='/' />:null}
            <h1 className="p-5 text-center">Signup</h1>
            {signupForm()}
        </div>
    </Layout>
    )
}


export default Signup;