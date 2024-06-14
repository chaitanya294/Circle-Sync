import React from 'react'

const OtherUserChat = (props) => {
  return (
    <div className="flex mb-2 ml-2">
        <div className="rounded py-2 px-3 bg-[#F2F2F2]">
            <p className="text-sm text-orange-400">
                ~{props.sender}
            </p>
            <p className="text-sm mt-1">
                {props.content}
            </p>
            <p className="text-right text-xs text-grey-dark mt-1">
                {props.hr_sent}:{props.min_sent}
            </p>
        </div>
    </div>
  )
}

export default OtherUserChat
