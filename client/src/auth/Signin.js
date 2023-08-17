import React, {useState} from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import Layout from "../core/Layout";
import axios from 'axios';
import { authenicate, isAdmin, isAuth } from "./helper";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const Signin = () => {

    const history = useNavigate();
    
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    })

    const {email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'})

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email, password}
        }).then(response => {
            // console.log(response)

            // save respone (user, token) localstorage/cookie
            

            authenicate(response, () => {
            
            setValues({...values, email:'', password: '', buttonText: 'Submitted'})
            // toast.success(`Welcome ${response.data.user.name}!!!`);
            isAdmin() ? history('/admin') : history('/private')
            })
        
        })
        .catch(error => {
            console.log('SIGNIN ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.response.data.error);

        })
    }

    const signinForm = () => (
        <form >
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" value={email} className="form-control" onChange={handleChange('email')}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" value={password} className="form-control" onChange={handleChange('password')}/>
            </div>

            <button className="btn btn-primary mr-1" onClick={clickSubmit}>
                {buttonText}
            </button>

        </form>
        
    )
    return (
    <Layout>
        <div className="col-d-6 offset-md-3">
            <ToastContainer />
            {isAuth() ? <Navigate to='/' />:null}
            <h1 className="p-5 text-center">Signin</h1>
            {signinForm()}
        </div>
    </Layout>
    )
}


export default Signin;