import React from 'react'

const UserMessage = (props) => {
  return (
    <div class="flex justify-end mb-2 mr-2">
        <div class="rounded py-2 px-3 bg-[#E2F7CB]">
            <p class="text-sm mt-1">
                {props.content}
            </p>
            <p class="text-right text-xs text-grey-dark mt-1">
                {props.hr_sent}:{props.min_sent}
            </p>
        </div>
    </div>
  )
}

export default UserMessage
