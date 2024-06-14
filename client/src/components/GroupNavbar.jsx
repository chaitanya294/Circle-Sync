import React from 'react'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ChatIcon from '@mui/icons-material/Chat';

const GroupNavbar = (props) => {
    function handleRanking() {
        props.handleRankingTrue();
    }
    function handleChat() {
        props.handleRankingFalse();
    }
  return (
    <>
        <div className='grid grid-cols-2 absolute bottom-0 w-full'>
        <div className = "grid grid-cols-1">
            <div className = "ml-[345px]">
                <LeaderboardIcon/>
            </div>
            <button onClick = {handleRanking}>Rankings</button>
        </div>
        <div className = "grid grid-cols-1">
            <div className = "ml-[350px]">
                <ChatIcon />
            </div>
            <button onClick = {handleChat}>Chats</button>
        </div>
        </div>
    </>
  )
}

export default GroupNavbar
