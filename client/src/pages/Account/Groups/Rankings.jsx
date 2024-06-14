import React, { useEffect, useState } from 'react'
import Rank from '../../../components/Rank';
const Rankings = () => {
  const [ranking, setRanking] = useState([]);
  useEffect(() => {
    async function getRanking() {
      const response = await fetch("http://localhost:3000/getRanking", {
        method : "POST",
        headers : {
          'Content-Type' : "application/json"
        },
        body : JSON.stringify({
          grpId : localStorage.getItem("grpId")
        })
      });
      const data = await response.json();
      setRanking(data);
    }
    getRanking();
  }, []);
  return (
    <div>
      <div className = "ml-[645px] font-bold">Leaderboard</div>
      {ranking.map((user, i) => {
        return <Rank key = {i} rank = {i} userName = {user.username} hr_spent = {user.hr_spent} min_spent = {user.min_spent} sec_spent = {user.sec_spent}/>
      })}
    </div>
  )
}

export default Rankings
