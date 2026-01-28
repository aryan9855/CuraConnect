import React, { useEffect, useState } from 'react'
import curaConnectLogo from "../../../../assets/Images/curaConnectLogo.jpg"
import { Link } from 'react-router-dom'
import {NavbarLinks} from "../../../../data/navbar-links" 
import { useLocation ,matchPath} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropDown from '../../Auth/ProfileDropDown'
import { apiConnector } from '../../../../services/apiconnector'
import { categories } from '../../../../services/apis'
import {IoIosArrowDropdownCircle} from 'react-icons/io'

function Navbar() {

    const{token} =useSelector((state)=>state.auth)
    const{user} =useSelector((state)=>state.profile)
    const{totalItems} =useSelector((state)=>state.cart)


    const location = useLocation()

    const [subLinks , setSubLinks] = useState()

    const fetchSubLinks = async()=>{
      try {
        const result = await apiConnector("GET",categories.CATEGORIES_API)
        console.log("Printing SubLinks results :", result)
        setSubLinks(result.data.data)
      } catch (error) {
        console.log("Couldnot fet the category list")
      }
    }

    useEffect(()=>{
        fetchSubLinks();
    },[])


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
                                link.title === "Catalog" ? (
                                <div className='flex items-center gap-2'>
                                    <p>{link.title}</p>
                                    <IoIosArrowDropdownCircle/>

                                    <div>
                                        
                                    </div>

                                </div>) : (
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

        {/* Login/signup */}
        <div className='flex gap-x-4 items-center'>

                {
                  user && user?.accountType != 'Doctor' &&(
                    <Link to="/dashboars/cart" className='relative'>
                      <AiOutlineShoppingCart/>
                      {
                        totalItems>0 &&(
                          <span>
                          {totalItems}
                          </span>
                        )
                      }
                    </Link>
                  )
                }

                {
                  token === null &&(
                    <Link to = "/login">
                      <button className="
                                        px-5 py-2
                                        text-white font-semibold
                                        rounded-lg
                                        border-2 border-transparent
                                        bg-origin-border
                                        bg-clip-padding
                                        bg-gradient-to-r from-cyan-400 to-blue-500
                                        hover:from-blue-500 hover:to-cyan-400
                                        transition-all duration-300
                                      ">
                                  Login
                      </button>

                    </Link>
                  ) 
                }
                {
                  token === null && (
                    <Link to = '/signup'>
                      <button className='px-5 py-2
                                        text-white font-semibold
                                        rounded-lg
                                        border-2 border-transparent
                                        bg-origin-border
                                        bg-clip-padding
                                        bg-gradient-to-r from-cyan-400 to-blue-500
                                        hover:from-blue-500 hover:to-cyan-400
                                        transition-all duration-300'>
                        Sign up
                      </button>
                    </Link>
                  )
                }

                {
                  token != null && <ProfileDropDown/>
                }
        </div>
      </div>
    </div>
  )
}

export default Navbar
