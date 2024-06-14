import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupNavbar from '../../../components/GroupNavbar';
import Rankings from './Rankings';
import Chats from './Chats';

const IndividualGroup = () => {
  const [grp, setGrp] = useState({});
  const [user, setUser] = useState({});
  const [isRanking, setIsRanking] = useState(true);
  const navigate = useNavigate();
  function handleClick () {
    localStorage.removeItem("grpId");
    navigate("/groups");
  }
  useEffect(() => {
    async function main() {
      const response = await fetch("http://localhost:3000/getData?user_id=" + localStorage.getItem("_id")+"&grp_id="+localStorage.getItem("grpId"), {
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        }
      });
      const data = await response.json();
      setUser(data[0]);
      setGrp(data[1]);
    }
    main();
  }, [])
  async function handleLeaveGrp() {
    const response = await fetch("http://localhost:3000/leaveGrp", {
      method : "POST",
      headers : {
        'Content-Type' : "application/json"
      },
      body : JSON.stringify({
        "_id" : localStorage.getItem("_id"),
        "grpId" : localStorage.getItem("grpId")
      })
    });
    localStorage.removeItem("grpId");
    navigate("/groups");
  }
  return (
    <div>
      <div className = "flex flex-row">
        <button className = "ml-3 mt-2" onClick = {handleClick}><ArrowBackIosIcon/></button>
        <div className = "ml-[630px] pt-2">{grp.grpName}</div>
        <button onClick = {handleLeaveGrp} className = "ml-[600px] pt-2">
          Leave Group
        </button>
      </div>
      {isRanking ? <Rankings/> : <Chats/>}
      <GroupNavbar handleRankingTrue = {() => setIsRanking(true)}  handleRankingFalse = {() => setIsRanking(false)} />
    </div>
  )
}

export default IndividualGroup
