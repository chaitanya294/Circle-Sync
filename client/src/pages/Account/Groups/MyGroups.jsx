import React, {useState, useEffect} from 'react'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import Group from "../../../components/Groups/Group2";
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
import AddGroupPage from './AddGroupPage';
import Navbar from '../../../components/Navbar';
import ShowModal from '../../../components/ShowModal';
const MyGroups = (props) => {
  const icon_style = {
    "fontSize": 45,
    "color" : "orange"
  };
  const [groups, setGroups] = useState([]);
  const [addGroupDisplay, setAddGroupDisplay] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  useEffect(( ) => {
    async function getData(){
      const response = await fetch("http://localhost:3000/getGroups", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          _id : localStorage.getItem("_id")
        })
      });
      const data = await response.json();
      if(data.msg){
        null;
      }
      else{
        setGroups(data);
      }
    }
    getData();
  }, [groups.length]);
  function handleAddGroup () {
    setGroups([]);
    setAddGroupDisplay(!addGroupDisplay);
  }
  return (
    <>
      {addGroupDisplay ? <AddGroupPage handleButton = {handleAddGroup} /> :
      <div>
        <div className = "flex flex-row">
          <div className = "mt-5 ml-[660px] text-xl font-medium">My Groups</div>
        </div>
        {groups.map((group) => {
          return <Group key = {group._id} grpId = {group._id} grpName = {group.grpName} goal = {group.goal} Leader = {group.leader} attendence = {group.attendence} startDate = {group.started_on} Members = {group.members} maxMembers = {group.maxMembers} description = {group.description}></Group>
        })}
        {(groups.length == 0) ? <div className='mt-64 ml-[480px]'>You have not joined any groups. Press the + button to add a study group</div> : null }
        <button className = "absolute bottom-[80px] right-[60px]" onClick = {handleAddGroup}><AddCircleSharpIcon style = {icon_style} /></button>
      </div>
      }
      <Navbar/>
    </>

  )
}

export default MyGroups
