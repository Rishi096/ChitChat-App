import React, { useEffect, useRef } from 'react'
import useGetMessage from '../../hooks/useGetMessage'
import MessageSkeleton from '../skelton/MessageSkelton';
import Message from './Message';
import useListenMessages from '../../hooks/useListenMessages';
const Messages = () => {
  const {messages,loading} = useGetMessage();
  useListenMessages();
  console.log(messages);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behaviour : "smooth"});
    },100);
  },[messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
       {!loading && messages.length > 0 &&
       messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message  message={message}/>
        </div>
       ))} 

       {loading && [...Array(3)].map((_,idx) => <MessageSkeleton key={idx}/>)}
       {!loading && messages.message === "Conversation not found" && (
        <p className='text-center font-semibold '>Send a message to start the conversation.</p>
       )}
    </div>
  )
}

export default Messages