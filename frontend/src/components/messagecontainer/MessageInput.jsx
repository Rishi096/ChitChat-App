import React from 'react'
import { IoMdSend } from "react-icons/io";
const MessageInput = () => {
  return ( 
    <form>
        <div className='w-full relative'>
            <input type="text"
            className='border text-sm rounded-lgblock w-full bg-gray-700 border-gray-600 text-white p-2.5'
            placeholder='Send a message...'
            />

            <button type='submit' 
            className='absolute inset-y-0 end-0 flex items-center pe-3 '>
            <IoMdSend />
            </button>
        </div>
    </form>
  )
} 

export default MessageInput