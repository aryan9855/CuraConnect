import React from 'react'
import Loader from '../components/core/HomePage/common/Loader'
import { Outlet } from 'react-router-dom'

function Dashboard() {

    const {loading: authLoading} = useSelector( (state)=> state.auth)
    const {loading: profileLoading} = useSelector( (state)=> state.pofile)

    if(profileLoading || authLoading){
        return(
            <Loader/>
        )
    }



  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar/>
            <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                    <Outlet/>
                </div>
            </div>
    </div>
  )
}

export default Dashboard
