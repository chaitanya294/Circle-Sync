import React, { useEffect, useState, useCallback } from 'react'
import { PieChart, Pie, Sector } from "recharts";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import Navbar from '../../../components/Navbar'
import { convertLength } from '@mui/material/styles/cssUtils';

function convertToNumber(time){
  const first_dig = time[0];
  const last_dig = time[1];
  let to_return = ((first_dig - "0")*10) + (last_dig - "0");
  return to_return;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D35400", "#76448A", "#616A6B"];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.subject_name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const Insights = () => {
  const [subjects, setSubjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  useEffect(() => {
    async function getData () {
      const response = await fetch("http://localhost:3000/getSubjects", {
        "method" : "POST",
        headers : {
          'Content-Type' : "application/json",
        },
        body : JSON.stringify({
          "user_id" : localStorage.getItem("_id")
        })
      });
      const data = await response.json();
      let totalTime = 0;
      for(let i = 0; i<data.message.length; i++){
        let TotalSecSpent = (convertToNumber(data.message[i].hr_spent))*60*60;
        TotalSecSpent += convertToNumber(data.message[i].min_spent)*60;
        TotalSecSpent += convertToNumber(data.message[i].sec_spent);
        data.message[i].TotalSecSpent = TotalSecSpent;
        totalTime += TotalSecSpent;
      }
      setSubjects(data.message);
      setTotal(totalTime);
    }
    getData();
  }, []);

  return (
    <div>
      <div className = "flex flex-row ml-[140px] mt-[150px]">
      <PieChart width={600} height={600}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={subjects}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={100}
        fill="#DC7633"
        dataKey="TotalSecSpent"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={subjects}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject_name" />
      <Radar
        name="ABC"
        dataKey="TotalSecSpent"
        stroke="#DC7633"
        fill="#DC7633"
        fillOpacity={0.6}
      />
    </RadarChart>
    </div>
      <Navbar/>
    </div>
  )
}

export default Insights
