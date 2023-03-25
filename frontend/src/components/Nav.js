import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const  Nav=() =>{
    const navigate = useNavigate(); 

    const auth = localStorage.getItem('user');
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <>
        {/* <img className="logo" src="/amalogo.png" alt="logo" /> */}
       { auth ? <ul className="nav-ul">
            <li><Link to="/">Expense Tracker</Link></li>
            <li><Link to="#">About Us</Link></li>
           
            <li><Link to="#">Contact Us</Link></li>
            <li><Link to="/signup" onClick={logout}>Logout  ({JSON.parse(auth).name}) </Link> </li>
        </ul> 
         :   <ul className="nav-ul nav-right" >
            <li> <Link to="/signup">Sign Up</Link></li>
             <li><Link to="/login" >Login</Link></li>
         </ul>
        }
        </>
    ) 
}

export default Nav;