import React, { useEffect } from 'react'
import { userSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';
import notification from "../assets/sound/notification.mp3";
const useListenMessages = () => {
     const {socket} = userSocketContext();
     const {messages,setMessages} = useConversation();
     
     useEffect(() => {
        socket?.on("newMessage",(newMessage) => {
            const sound = new Audio(notification);
            sound.play();
            setMessages([...messages,newMessage])
        });
        return () => socket?.off("newMessage")
     },[socket,setMessages,messages]);
}

export default useListenMessages