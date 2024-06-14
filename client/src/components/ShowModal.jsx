import React, {useState} from 'react'

const ShowModal = (props) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }
  const handleClick = () => {
    props.handleButton2(inputValue);
  }
  return (
    <>
        <div className = "opacity-[.50] left-0 right-0 top-0 bottom-0 bg-[#bdbdbd] absolute" ></div>
        <div className = "w-4/12 rounded-3xl shadow-md h-[360px] mt-[140px] ml-[470px] absolute bg-white" >
            <div className = "font-bold text-center pt-2">{props.heading}</div>
            <input onChange = {handleInputChange} type = "text" value = {props.pre} placeholder = {props.content} className = "font-medium mt-4 p-2 ml-[15px] w-[430px] outline-none"></input>
            <div className = "flex flex-row-reverse mt-[220px]">
                <button className = "p-4 pr-5" onClick = {handleClick}>{props.textButton2}</button>
                <button className = "p-4" onClick = {props.handleButton1} >{props.textButton1}</button>
            </div>
        </div>
    </>
  )
}

export default ShowModal