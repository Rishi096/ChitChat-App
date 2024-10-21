import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search,setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} =  useGetConversations();

  
  const submitHandler = (e) => {
    e.preventDefault();
    if(!search) 
        return;


    if(search.length < 3)
       return toast.error("Search atleast three characters long");

    if (!Array.isArray(conversations) || conversations.length === 0) {
      return toast.error("No conversations available");
    }
  
    const conversation = conversations.find((c) => c?.Fullname?.toLowerCase()?.includes(search));
    const inp =  conversations.find((c) => c?.Fullname.includes(search));

    if(conversation || inp){
      (conversation) ? setSelectedConversation(conversation):setSelectedConversation(inp);
      setSearch('');
    }
    else{
      toast.error("No such user found!");
    }
  };  
  return (
   <form className='flex items-center gap-2' onSubmit={submitHandler}>
    <input type="text" 
     placeholder='Search'
     className='input input-bordered rounded-full'
     value={search}
     onChange={(e) => setSearch(e.target.value)}/>
    <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
    <CiSearch className='w-7 h-7 outline-none'/>
    </button>
   </form>
  )
}

export default SearchInput