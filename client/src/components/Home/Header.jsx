import React, {useState} from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ShowModal from '../ShowModal';

const Header = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const Time = new Date();
  const day = (Time.getDay());
  const date = Time.getDate();
  const month = (Time.getMonth() + 1);
  const Alpha_day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function display(date){
    let str_date = "";
    if(date >= 10){
      str_date += date;
    }
    else{
      str_date = "0" + date;
    }
    return str_date;
  }
  function handleDetail () {
    if(showDetail == true){
      setShowDetail(false);
    }
    else{
      setShowDetail(true);
    }
  }
  return (
    <div className='bg-orange-500 h-[160px]'>
      {showDetail && <ShowModal heading = "Info" pre = "Timer shows the sum of all active subjects for the day     " textButton2 = "Cancel" handleButton2 = {handleDetail}/>}
      <div className='text-white font-normal font-sans pt-7 pl-[650px]'> {Alpha_day[day]}, {display(date)}/{display(month)}</div>
      <div className='text-white font-semibold text-4xl pt-10 pl-[600px]'> {props.hours}:{props.minutes}:{props.seconds}
        <button onClick = {handleDetail}>
          <HelpOutlineIcon/>
        </button>
      </div>
    </div>
  )
}

export default Header
