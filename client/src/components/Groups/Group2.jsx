import React from 'react'
import {useNavigate} from "react-router-dom";

const Group = (props) => {
    const navigate = useNavigate();
    async function handleClick() {
      localStorage.setItem("grpId", props.grpId);
      navigate("/group");
    }
  return (
    <button onClick = {handleClick} className = "w-[1440px]">
      <div className = "m-3 p-2 bg-white hover:bg-zinc-100 rounded-md drop-shadow">
          <div className = "font-medium text-sm p-1 flex flex-row">{props.grpName}</div>
          <div className = "flex flex-row font-medium text-xs p-1">
              <div>Goal : {props.goal}</div>
              <div className = "ml-2">Members : {props.Members}/{props.maxMembers}</div>
              <div className = "ml-2">Leader : {props.Leader}</div>
          </div>
          <div className = "flex flex-row font-medium text-xs p-1">
              <div>Attendence : {props.attendence}</div>
              <div className = "ml-2">Started on : {props.startDate.substring(0,10)}</div>
          </div>
          <div className = "font-medium text-xs p-1 flex flex-row">
              Description : {props.description}
          </div>
      </div>
    </button>
  )
}

export default Group
