import React, {useState, useEffect, useReducer} from 'react'
import Header from "../../../components/Home/Header";
import CustomButton from '../../../components/CustomButton';
import Subjects from '../../../components/Home/Subjects';
import ShowModal from '../../../components/ShowModal';
import Navbar from '../../../components/Navbar';
import { CronJob } from 'cron';

const Home = () => {
  const [hrs, setHrs] = useState("00");
  const [mins, setMins] = useState("00"); 
  const [sec, setSec] = useState("00");
  const [addSubject, setAddSubject] = useState(false);
  const [subjects, setSubjects] = useState([]);
  function getNum(time){
    let numTime = 0;
    numTime = (time[1] - "0") + ((time[0] - "0")*10);
    return numTime;
  }
  function convertToString(time) {
    let str_time = "";
    if(time >= 10){
      let last_dig = (time%10);
      time/=10;
      time = Math.floor(time);
      let first_dig = (time);
      str_time += first_dig;
      str_time += last_dig;
    }
    else{
      str_time += "0";
      str_time += time;
    }
    return str_time;
  }
  useEffect(() => {
      async function main() {
        const response = await fetch("http://localhost:3000/getSubjects", {
          method : 'POST',
          headers : {
            'Content-Type' : "application/json"
          },
          body : JSON.stringify({user_id : localStorage.getItem("_id")})
        });
        let total_hrs = 0;
        let total_min = 0;
        let total_sec = 0;
        const res = await response.json();
        const data = res.message;
        const new_arr = [];
        for(let i = 0; i<data.length; i++){
          total_hrs += getNum(data[i].hr_spent);
          total_min += getNum(data[i].min_spent);
          total_sec += getNum(data[i].sec_spent);
          const new_sub = {
            _id : data[i]._id,
            subject_name : data[i].subject_name,
            hr_spent : data[i].hr_spent,
            min_spent : data[i].min_spent,
            sec_spent : data[i].sec_spent,
            is_active : false,
          };
          new_arr.push(new_sub);
        }
        let min_added = Math.floor(total_sec/60);
        total_sec = (total_sec%60);
        total_min += min_added;
        let hrs_added = Math.floor(total_min/60);
        total_min = (total_min % 60);
        total_hrs += hrs_added;
        if(total_hrs >= 100 || total_hrs < 1){
          total_hrs = 0;
        }
        if(total_min < 1){
          total_min = 0;
        }
        let hr_string = convertToString(total_hrs);
        let min_string = convertToString(total_min);
        let sec_string = convertToString(total_sec);
        setSubjects(new_arr);
        setHrs((hrs) => hr_string);
        setMins((mins) => min_string);
        setSec((sec) => sec_string);
      }
      async function setId() {
        const response = await fetch("http://localhost:3000/getId", {
          method : "POST",
          headers : {
            'Content-Type' : "application/json",
          },
          body : JSON.stringify({
            token : localStorage.getItem("token")
          })
        });
        const data = await response.json();
        localStorage.setItem("_id", data._id);
      }
      setId();
      main();
  }, [subjects.length]);
  const job = CronJob.from({
    cronTime: '* * * * * 7',
    onTick: async function () {
      const response = await fetch("http://localhost:3000/resetSubject", {
          method : "POST",
          headers : {
            'Content-Type' : "application/json",
          },
          body : JSON.stringify({
            "_id" : localStorage.getItem("_id")
        })
      });
    },
    start: true,
    timeZone: 'UTC+5:30'
  });
  const removeAddSub = () => {
    if(addSubject == true) {
      setAddSubject(false);
    }
    else{
      setAddSubject(true);
    }
  }
  const handleBackend = async (inputValue) => {
     const subject_name = inputValue;
     const response = await fetch("http://localhost:3000/addSubjects", {
        method : 'POST',
        headers : {
          'Content-Type' : "application/json"
        },
        body : JSON.stringify({ user_id : localStorage.getItem("_id"), subject_name : subject_name})
     });
     removeAddSub();
     setSubjects([...subjects, {
      subject_name : subject_name,
      hr_spent : "00",
      min_spent : "00",
      sec_spent : "00",
      is_active : false,
     }]);
  }
  return (
    <div>
      {addSubject && <ShowModal handleButton1 = {removeAddSub} handleButton2 = {handleBackend} textButton1 = "Cancel" textButton2 = "Done" heading = "Subject Name" content = "e.g. Math, Science, History... "/>}
      <Header hours = {hrs} minutes = {mins} seconds = {sec}/>
      {(subjects).map((sub, i) => {
          return <Subjects key = {i} changeState = {setSubjects} sub_id = {sub._id} subject = {sub.subject_name} hours = {sub.hr_spent} minutes = {sub.min_spent} seconds = {sub.sec_spent} changeHeaderHrs = {setHrs} changeHeaderMins = {setMins} changeHeaderSec = {setSec}/>
      })}
      <CustomButton text = "+Subject" addSub = {removeAddSub}/>
      <Navbar/>
    </div>
  )
}

export default Home
