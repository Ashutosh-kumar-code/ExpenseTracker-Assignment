import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp =()=>{

    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    // const [error, setError] = useState(false);

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })

const collectData= async()=>{

    if(!name || !email || !password ){
        alert("Enter details properly")
    }else{
const result = await fetch('http://localhost:8080/api/signup',{
    method:'post',
    body: JSON.stringify({name,email,password}),
    headers:{
        'Content-Type':'application/json'
    }
})
    const show = await result.json();
    console.log(show);
    localStorage.setItem('user',JSON.stringify(show.result));
    localStorage.setItem('token',JSON.stringify(show.auth));
if(result){
    navigate('/');
}
}

}

        return (
            <div className="signup">
                <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="enter Name" value={name} onChange={(e)=> setName(e.target.value)} />
           
            <input className="inputBox" type="text" placeholder="enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
       
            <input className="inputBox" type="password" placeholder="enter password" value={password} onChange={(e)=> setPassword(e.target.value)} />
           
            <button type="button" onClick={collectData}>Sign Up</button>
            </div>
        )
}

export default SignUp;