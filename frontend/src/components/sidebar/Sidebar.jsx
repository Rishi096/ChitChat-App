import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from '../../pages/logout/LogoutButton'
const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput />
        <div className='divider px-3'></div>
        <Conversations />
    <div className='mt-auto p-2.5 fixed left-0 bottom-0 w-[100%]'>
    <LogoutButton /> 
    </div>     
    </div>
  )
}

export default Sidebar