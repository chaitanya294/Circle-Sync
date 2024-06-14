import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShowModal from '../ShowModal';

const Subjects = (props) => {
    const [editSub, setEditSub] = useState(false);
    const [timer, setTimer] = useState(null);
    const [hour, setHours] = useState(props.hours);
    const [minutes, setMinutes] = useState(props.minutes);
    const [seconds, setSeconds] = useState(props.seconds);
    let IconStyle = {
        height : "30px",
        width : "30px"
    }
    function displayTime(time) {
        if(time.length == 1){
            time = "0" + time;
        }
        return time;
    }
    function increaseHours() {
        setHours((hours) => {
            const last_dig = hours[1];
            let ret_hours = hours[0];
            if(last_dig == "9") {
                if(ret_hours == "9"){
                  ret_hours = "00";
                }
                else{
                  const num_dig = (ret_hours - "0") + 1;
                  ret_hours = "" + num_dig;
                  ret_hours += "0";
                }
            }
            else{
                const num_last_dig = (last_dig - "0") + 1;
                ret_hours += num_last_dig;
            }
            return ret_hours;
        });
    }
    function increaseMinutes() {
        setMinutes((minutes) => {
            const last_dig = minutes[1];
            let ret_minutes = minutes[0];
            if(last_dig == "9") {
                if(ret_minutes == "5"){
                  ret_minutes = "00";
                  increaseHours();
                }
                else{
                  const num_dig = (ret_minutes - "0") + 1;
                  ret_minutes = "" + num_dig;
                  ret_minutes += "0";
                }
            }
            else{
                const num_last_dig = (last_dig - "0") + 1;
                ret_minutes += num_last_dig;
            }
            return ret_minutes;
        });
    }
    function increaseMinsForHeaders(minutes) {
        let last_dig = minutes[1];
        let str_ans = "";
        if(last_dig == "9"){
            if(minutes[0] == "5"){
                str_ans = "00";
                props.changeHeaderHrs((hours) => increaseHrsForHeaders(hours));
            }
            else{
                let first_dig = (minutes[0] - "0") + 1;
                str_ans += first_dig;
                str_ans += "0";
            }
        }
        else{
            str_ans += minutes[0];
            let new_last_dig = (last_dig - "0")+1;
            str_ans += new_last_dig;
        }
        return str_ans;
    }
    function increaseHrsForHeaders(hours){
        let last_dig = hours[1];
        let str_ans = "";
        if(last_dig == "9"){
            if(hours[0] == "9"){
                str_ans = "00";
            }
            else{
                let new_hr_first = (hours[0] - "0") + 1;
                str_ans += new_hr_first;
                str_ans += "0";
            }
        }
        else{
            str_ans += hours[0];
            let new_hrs = (last_dig - "0") + 1;
            str_ans += new_hrs;
        }
        return str_ans;
    }
    function increaseSecForHeaders(seconds){
        let last_dig = seconds[1];
        let str_seconds = "";
        if(last_dig == "9"){
            if(seconds[0] == "5"){
                str_seconds = "00";
                props.changeHeaderMins((minutes) => increaseMinsForHeaders(minutes));
            }
            else{
                let first_dig = (seconds[0]-"0")+1;
                str_seconds += first_dig;
                str_seconds += "0";
            }
        }
        else{
            let first_dig = (seconds[1]-"0")+1;
            str_seconds += seconds[0];
            str_seconds += first_dig;
        }
        return str_seconds;
    }
    function increaseSeconds() {
        props.changeHeaderSec(seconds => increaseSecForHeaders(seconds));
        setSeconds((seconds) => {
          const last_dig = seconds[1];
          let ret_seconds = seconds[0];
          if(last_dig == "9") {
            if(ret_seconds == "5"){
                ret_seconds = "00";
                increaseMinutes();
            }
            else{
                const num_dig = (ret_seconds - "0") + 1;
                ret_seconds = "" + num_dig;
                ret_seconds += "0";
            }
          }
          else{
            const num_last_dig = (last_dig - "0") + 1;
            ret_seconds += num_last_dig;
          }
          return ret_seconds;
        });
    }
    async function handleToggle() {
        if(timer == null){
            setTimer(setInterval(increaseSeconds,1000));
        }
        else{
            clearInterval(timer);
            setTimer(null);
            const id = props.sub_id;
            const response = await fetch("http://localhost:3000/updateSubject", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    id : id,
                    hr_spent : hour,
                    min_spent : minutes,
                    sec_spent : seconds,
                })
            });

            const data = await response.json();
            if(data.message == null){
                window.alert("Can't connect to server")
            }
        }
    }
    function handleEditSubject() {
        if(editSub){
            setEditSub(false);
        }
        else{
            setEditSub(true);
        }
    }
    async function handleButton2(inputValue) {
        const obj = {
            id : props.sub_id,
            subject_name : inputValue,
        }
        const response = await fetch("http://localhost:3000/updateSubject", {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(obj)
        });
        setEditSub(false);
        props.changeState([]);
    }
    async function handleButton1() {
        const obj = {
            id : props.sub_id
        }
        const response = await fetch("http://localhost:3000/deleteSubjects", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(obj)
        })
        setEditSub(false);
        props.changeState([]);
    }
  return (
    <>
        {editSub && <ShowModal heading = "Edit Subject" content = "Enter modified subject name" textButton2 = "Ok" textButton1 = "Delete" handleButton1 = {handleButton1} handleButton2 = {handleButton2}/>}
        <div className ="flex flex-row pt-4 pl-4 pb-4">
            <button className='flex flex-row basis-1/2' onClick = {handleToggle}>
                <PlayCircleIcon style = {IconStyle}/>
                <div className = "pl-2 pt-0.5">{props.subject}</div>
            </button>
            <button className='flex flex-row basis-1/2 flex-row-reverse' onClick = {handleEditSubject}>
                <MoreVertIcon/>
                <div>{displayTime(hour)}:{displayTime(minutes)}:{displayTime(seconds)}</div>
            </button>
        </div>
    </>
  )
}

export default Subjects
