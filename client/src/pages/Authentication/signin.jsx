import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Account from "../Account/Account.jsx";

function Signin () {
    let initialState = {
        "username" : "",
        "password" : ""
    };
    const [formData, setFormData] = useState(initialState);
    const [isLogin, setIsLogin] = useState(false);
    let navigate = useNavigate();
    function To_Signup (){
        navigate("/signup");
    }
    function handleChange(e){  
        const {id, value} = e.target;
        setFormData({...formData , [id] : value});
    }
    async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch("http://localhost:3000/signin", {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                "username" : formData.username,
                "password" : formData.password
            })
        })
        const data = await response.json();
        if(data.msg){
            window.alert(data.msg);
        }
        else{
            window.alert("Signin Successfull");
            window.localStorage.setItem("token", data.token);
            navigate("/home");
        }
    }
    return <div>
        <div class = "grid grid-cols-2 mt-[220px] my-44  ml-96">
            <img width = "350px" src = "../../../../public/Logo.png"></img>
            <div class = "grid grid-cols-1 w-[450px]">
                <input  class = "border border-zinc-300 rounded-lg pl-7" type = "text" id = "username" placeholder = "Username" onChange = {handleChange}></input>
                <input class = "border border-zinc-300 rounded-lg pl-7 mt-2 mb-2" type = "text" id = "password" placeholder = "Password" onChange = {handleChange}></input>
                <button class = "bg-lime-600 rounded-md text-white h-16 mt-4" onClick = {handleSubmit}>Log in</button>
                <button class = "bg-blue-600 rounded-md text-white h-16" onClick = {To_Signup}>Create New Account</button>
            </div>
        </div>
    </div>
}

export default Signin