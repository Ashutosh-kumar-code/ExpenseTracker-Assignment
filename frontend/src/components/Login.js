import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login=()=>{
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/");
        }
    },[])

    const handleLogin= async()=>{
        console.warn(email,password);
        let result = await fetch('http://localhost:8080/api/login',{
            method:'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type':'application/json'
            }
        })
       result = await result.json();
       console.log(result);
       if(result.auth){
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));

        navigate("/");
       }else{
        alert("please enter correct details")
       }
    }

    return(
        <div className="login" >
        <h1>Login</h1>
        <input className="inputBox" type="text" placeholder="enter email"
        onChange={(e)=> setEmail(e.target.value)} value={email} />

        <input className="inputBox" type="password" placeholder="enter password" 
        onChange={(e)=> setPassword(e.target.value)} value={password} />

        <button type="button" onClick={handleLogin} >Login</button>

        </div>
    )
}

export default Login;