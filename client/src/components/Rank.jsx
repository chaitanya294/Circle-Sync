import React from 'react'

const Rank = (props) => {
  return (
    <div className='flex flex-row bg-zinc-100 m-2 rounded-2xl'>
        <div className = "m-4 pl-[22px] pt-[12px] pb-[12px] pr-[20px] border-orange-400 border-2 rounded-full text-orange-400">{props.rank+1}</div>
        <div className='m-4 mt-6 font-semibold text-2xl '>{props.userName}</div>
        <div className='ml-[930px] text-end pt-7 hover:text-center text-lg'>{props.hr_spent}:{props.min_spent}:{props.sec_spent}</div>
    </div>
  )
}

export default Rank