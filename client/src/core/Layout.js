import React, {Fragment} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { isAuth, signOut } from '../auth/helper';



const Layout = ({children}) => {

        const history = useNavigate();
        const active_path = useLocation().pathname;
        const isActive = (path) => {
            if(active_path === path){
                return 'text-dark'
            }
            return 'text-light'
        }

        // console.log(active_path)
        const nav = () => (

        <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
            <Link to='/' className={`${isActive('/')} nav-link`}>Home</Link>
        </li>

        
        {
            isAuth() && 
                    <li className='nav-item'>
                        <span className='text-light nav-link'
                        onClick={() => {
                            signOut(() => 
                            {history('/signin')})
                            
                        }}
                        style={{cursor: 'pointer'}}
                        >Signout</span>
                    </li>
        }

        {
            !isAuth() && <Fragment>
                <li className='nav-item'>
                    <Link to='/signin' className={`${isActive('/signin')} nav-link`}>Signin</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/signup' className={`${isActive('/signup')} nav-link`}>Signup</Link>
                    </li>
            </Fragment>
        }


       

        
        
       </ul>

)


    return <Fragment>
        {nav()}
        <div className='container'>
            {children}
        </div>

    </Fragment>
}

export default Layout;