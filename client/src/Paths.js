import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import Private from "./core/Private";
import Admin from "./core/Admin";
import PrivateWrapper from "./auth/PrivateWrapper";
import { isUser, isAdmin } from "./auth/helper";

const Paths = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' exact 
            Component={App} />
            <Route path='/signup' exact Component={Signup} />
            <Route path='/signin' exact Component={Signin} />
            <Route path='/auth/activate/:token' exact Component={Activate}/>
            <Route element={<PrivateWrapper auth={{ isAuth: isUser() }}/>}>
                <Route path="/private" Component={Private}/>
            </Route>
            <Route element={<PrivateWrapper auth={{ isAuth: isAdmin() }}/>}>
                <Route path="/admin" Component={Admin}/>
            </Route>

        </Routes>
        </BrowserRouter>
    )
}


export default Paths;