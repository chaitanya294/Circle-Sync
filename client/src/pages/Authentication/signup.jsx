import {useNavigate} from "react-router-dom";
import {useState} from "react";
function Signup () {
    let navigate = useNavigate();
    function To_Signin() {
        navigate("/");
    }
    const initialData = {
        "username" : "",
        "email_id" : "",
        "password" : "",
        "firstName" : "",
        "lastName" : "",
        "organization" : ""
    }
    const [userData, setUserData] = useState(initialData);
    function handleChange (e) {
        const {id, value} = e.target;
        setUserData({...userData, [id] : value});
    }
    async function handleSubmit (e) {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/signup", {
            method : "POST",
            headers: {
				'Content-Type': 'application/json',
			},
            body : JSON.stringify(
                {
                    "username" : userData.username,
                    "password" : userData.password,
                    "email_id" : userData.email_id,
                    "firstName" : userData.firstName,
                    "lastName" : userData.lastName,
                    "organization" : userData.organization
                }
            )
        });
        const body = await response.json();
        window.alert(body.msg);
        To_Signin();
    }
    return <div>
        <div  class = "[&>input]:h-11 w-[28rem] pl-4  grid grid-cols-1 shadow-zinc-400/40 shadow-xl ml-[550px] mt-48">
            <input class = "pl-4" type = "text" id = "username" placeholder ="Enter your username" onChange = {handleChange}></input>
            <input class = "pl-4" type = "text" id = "email_id" placeholder = "Email Address" onChange = {handleChange}></input>
            <input class = "pl-4" type = "text" id = "password" placeholder = "Password" onChange = {handleChange}></input>
            <input class = "pl-4" type = "text" id = "firstName" placeholder = "First Name" onChange = {handleChange}></input>
            <input class = "pl-4" type = "text" id = "lastName" placeholder = "Last Name" onChange = {handleChange}></input>
            <input class = "pl-4" type = "text" id = "organization" placeholder = "Enter your organization" onChange = {handleChange}></input>
            <p class = "w-fit text-sm mt-4 pl-4">By clicking Sign Up, you agree to our terms and privacy policy.</p>
            <button class = "ml-4 w-[25rem] h-12 bg-lime-600 mt-5 mb-4 rounded-lg text-white" onClick = {handleSubmit}>Sign up</button>
            <button class = "text-blue-700 mt-5 mb-4 rounded-lg" onClick = {To_Signin}>Have an Account? Signin</button>

        </div>
    </div>
}
export default Signup