import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsightsIcon from '@mui/icons-material/Insights';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const icon_style = {
        "fontSize": 30,
        "margin-left" : 170,
    };

  return (
    <nav className='grid grid-cols-4 absolute bottom-0 w-full'>
      <div>
        <HomeOutlinedIcon style={icon_style}/>
        <Link to = "/home" className = "pl-40 font-medium">Home</Link>
      </div>
      <div>
        <InsightsIcon  style = {icon_style}/>
        <Link to = "/insights" className = "pl-40 font-medium">Insights</Link>
      </div>
      <div>
        <PeopleOutlineIcon  style = {icon_style}/>
        <Link to = "/groups" className = "pl-40 font-medium">Groups</Link>
      </div>
      <div>
        <MoreHorizIcon style = {icon_style}/>
        <Link to = "/info" className = "pl-[10.5rem] font-medium">More</Link>
      </div>
    </nav>
  )
}

export default Navbar
