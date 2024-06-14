import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useScrollTrigger } from '@mui/material';
const CreateNewGroup = (props) => {
    const [grpName, setGrpName] = useState("");
    const [dailyTarget, setDailyTarget] = useState("");
    const [maxMembers, setMaxMembers] = useState(0);
    const [attendence, setAttendence] = useState("");
    const [description, setDescription] = useState("");
    async function createGroup() {
        const response = await fetch("http://localhost:3000/createGrp", {
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify({
                grpName : grpName,
                goal : dailyTarget,
                maxMembers : maxMembers,
                leader : localStorage.getItem("_id"),
                attendence : attendence,
                description : description
            })
        });
        const data = await response.json();
        props.toBack();
    }
  return (
    <div>
        <div className = "flex flex-row">
            <button  className = "ml-3 mt-2" onClick = {props.handleClick}><ArrowBackIosIcon/></button>
            <div className = "ml-[640px] pt-2">Create Group</div>
            <button className='ml-[620px] pt-2' onClick = {createGroup}>Done</button>
        </div>
        <input className = "w-[1400px] ml-3 p-2 mt-5" placeholder = "Enter Group Name" onChange = {(e) => setGrpName(e.target.value)}></input>
        <br></br>
        <input className = "w-[1400px] ml-3 p-2" placeholder = "Daily Time Goal" onChange = {(e) => setDailyTarget(e.target.value)}></input>
        <br></br>
        <input className = "w-[1400px] ml-3 p-2" placeholder = "Enter Maximum Members Limit" onChange = {(e) => setMaxMembers(e.target.value)}></input>
        <br></br>
        <input className = "w-[1400px] ml-3 p-2" placeholder = "Attendence" onChange = {(e) => setAttendence(e.target.value)}></input>
        <br></br>
        <textarea className = "w-[1400px] h-[250px] ml-3 p-2" placeholder = "Describe your group. Include any joining criteria or motivational message to welcome new members" onChange = {(e) => setDescription(e.target.value)}></textarea>
        <br></br>
    </div>
  )
}

export default CreateNewGroup
