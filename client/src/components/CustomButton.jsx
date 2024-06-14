import React from 'react'

const CustomButton = (props) => {
  return (
    <button onClick = {props.addSub} className = "bg-zinc-300 m-3 pl-3 pr-3 pt-0.5 pb-0.5 rounded-lg">
        +Subjects
    </button>
  )
}

export default CustomButton
