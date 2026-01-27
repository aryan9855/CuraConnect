import React from 'react'
import curaConnectLogo from "../../../../assets/Images/curaConnectLogo.jpg"
import { Link } from 'react-router-dom'
import {NavbarLinks} from "../../../../data/navbar-links" 
import { useLocation ,matchPath} from 'react-router-dom'

function Navbar() {
    const location = useLocation()
    const matchRoute = (route)=>{
        return matchPath({path:route} , location.pathname)
    }


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-black mt-5'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-center'>
        <Link to="/">
        <img src={curaConnectLogo} width={80} height={30} loading = 'lazy' className='rounded-lg'/>
        </Link>

        {/* navLinks */}
        <nav>
            <ul className='flex gap-x-6 text-white'>
                {
                    NavbarLinks.map( (link , index ) =>( 
                         <li key = {index}>
                            {
                                link.title === "Catalog" ? (<div></div>) : (
                                   <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ?"text-blue-700" : "text-white"}`}>
                                        {link.title}
                                    </p>
                                   </Link> 
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
