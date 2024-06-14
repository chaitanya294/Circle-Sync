import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Account () {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        async function main() {
            const response = await fetch("http://localhost:3000/getData", {
                method : "POST",
                headers : {
                    'Content-Type' : "application/json"
                },
                body : JSON.stringify({
                    user_id : localStorage.getItem("_id")
                })
            });
            const data = await response.json();
            setUser(data);
        };
        main();
    }, []);
    function handleSignOut() {
        localStorage.clear();
        navigate("/");
    }
    return <div>
        <div class = "w-[850px] ml-[400px] mt-48">
            <div class = "grid grid-cols-2">
                <div class = "pl-12 pt-11 font-medium">Icon </div>
                <img class = "ml-20 pl-3" width = "100px" height = "100px" src = "../../../public/Icon_profile.png"></img>
            </div>
            <div class = "pl-12 pt-5 font-medium" >Nickname : {user.username} </div>
            <div class = "pl-12 pt-3 font-medium" >Name : {user.firstName + " " + user.lastName}</div>
            <div class = "pl-12 pt-3 font-medium" >Email Id : {user.email_id}</div>
            <div class = "pl-12 pt-3 font-medium" >App version : 1.0</div>
            <button class = "font-bold ml-72 w-60 h-10 mt-10 rounded-lg bg-lime-600 text-white" onClick = {handleSignOut}>Sign Out</button>
            <br/>
        </div>
        <Navbar/>
    </div>
}

export default Account;