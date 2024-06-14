import React, { useState, useEffect } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Group from '../../../components/Groups/Group1';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import CreateNewGroup from './CreateNewGroup';
const AddGroupPage = (props) => {
    const [displayCreateGroup, setDisplayCreateGroup] = useState(false);
    const icon_style = {
        "fontSize": 45,
        "color" : "orange"
    };
    const [groups, setGroups] = useState([]);
    useEffect( () => {
        async function getGroups() {
            const response = await fetch("http://localhost:3000/getGroups/" + localStorage.getItem("_id") , {
                method : 'GET',
                headers : {
                    'Content-Type' : "application/json"
                }
            });
            const data = await response.json();
            setGroups(data);
        }
        getGroups();
    }, [groups.length]);
    function handleCreateGroup() {
        setGroups([]);
        setDisplayCreateGroup(!displayCreateGroup);
    }
  return (
    <>
    {displayCreateGroup ? <CreateNewGroup handleClick = {handleCreateGroup} toBack = {props.handleButton}/> : <div className = "bg-zinc-100">
        <div className='flex flex-row'>
            <button className = "ml-3 mt-2 mb-2" onClick = {props.handleButton}><ArrowBackIosIcon/></button>
            <div className = "ml-[660px] mt-2">Study Group</div>
        </div>
        {groups.map((group) => {
            return <Group key = {group._id} grpId = {group._id} grpName = {group.grpName} goal = {group.goal} Leader = {group.leader} attendence = {group.attendence} startDate = {group.started_on} Members = {group.members} maxMembers = {group.maxMembers} description = {group.description} handleCreateGroup = {props.handleButton}></Group>
        })}
        <button className = "absolute bottom-[80px] right-[60px]" onClick = {() => setDisplayCreateGroup(!displayCreateGroup)}><AddCircleSharpIcon style = {icon_style} /></button>
    </div>
    }
    </>
  )
}

export default AddGroupPage