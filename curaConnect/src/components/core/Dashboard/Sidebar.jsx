import React from 'react'

import{sidebarlinks} from '../../../data/dashborad-links'
import {logout} from '../../../services/operations/authAPI'
import { useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'


function Sidebar() {


    const {user, loading:profileLoading} = useSelector((state)=> state.profile)
    const { loading:authLoading} = useSelector((state)=> state.auth)

    if(profileLoading || authLoading){
        return(
            <Loader/>
        )
    }

  return (
    <div>
        <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-black
                        h-[calc(100vh-3.5rem)] py-10' >
             <div className='flex flex-col'>
            {
                sidebarlinks.map((link)=>{
                    if(link.type && user?.accountType !==link.type) return null;
                    return (
                        <SidebarLink key ={link.id} link ={link} iconName={link.icon}/>
                    )
                })
            }

            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-black'></div>

            <div className='flex flex-col'>
                <SidebarLink
                    link={{name:"Settings" , path:"dashboard/settings"}}
                    iconName = "VscSettingsGear"
                />
            </div>
        </div>
    </div>
  )
}

export default Sidebar
