import React, {useCallback, useEffect, useState} from "react";
import {Link, Redirect, useParams} from 'react-router-dom';
import Layout from "../core/Layout";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {decodeToken} from 'react-jwt';


const Activate = () => {


    const webToken = useParams().token;
    const decodedToken= decodeToken (webToken);

    const [values, setValues] = useState({
        
        token: webToken,
        name: decodedToken.name,
        show: true
    })

    console.log(decodedToken.password);
 
    

    const {name, token, show} = values;       


    const clickSubmit = (event) => {
        event.preventDefault();
        

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        }).then(response => {

            console.log('ACCOUNT ACTIVATION',response)
            setValues({...values, show: false})
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log('ACCOUNT ACTIVATION ERROR', error.response.data)
            toast.error(error.response.data.error);

        })
    }

    const activationLink = () => (       

        <div className="text-center">
            <h1 className="p-5">Hey {name}!!! Click on button to activate your account</h1>
            {show && <button className="btn btn-outline-primary" onClick={clickSubmit}>Activate Account</button>}
        </div>

    ) 
    

    return (
    <Layout>
        <div className="col-d-6 offset-md-3">
            <ToastContainer />
            {activationLink()}
        </div>
    </Layout>
    )
}


export default Activate;