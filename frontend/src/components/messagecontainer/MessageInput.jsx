import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
import useSendMessage from '../../hooks/useSendMessage';
const MessageInput = () => {
   const [message,setMessage] = useState("");
   const {loading,sendMessage} = useSendMessage();

   const submitHandler = async(e) => {
    e.preventDefault();
    if(!message) return;

    await sendMessage(message);
    setMessage("");
   }

    return ( 
    <form onSubmit={submitHandler}>
        <div className='w-full relative'>
            <input type="text"
            className='border text-sm rounded-lgblock w-full bg-gray-700 border-gray-600 text-white p-2.5'
            placeholder='Send a message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />

            <button type='submit' 
            className='absolute inset-y-0 end-0 flex items-center pe-3 '>
            
            {loading ? <div className='loading loading-spinner'></div>: <IoMdSend />}
            </button>
        </div>
    </form>
  )
} 

export default MessageInput