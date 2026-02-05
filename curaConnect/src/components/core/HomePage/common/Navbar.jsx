import React, { useEffect, useState } from 'react'
import curaConnectLogo from "../../../../assets/Images/CuraConnectLogo.jpg";
import { Link } from 'react-router-dom'
import { NavbarLinks } from "../../../../data/navbar-links";
import { useLocation ,matchPath} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropDown from "../../Auth/ProfileDropDown";
import { apiConnector } from "../../../../services/apiconnector";
import { categories } from "../../../../services/apis";

import {IoIosArrowDropdownCircle} from 'react-icons/io'

function Navbar() {

    const{token} =useSelector((state)=>state.auth)
    const{user} =useSelector((state)=>state.profile)
    const{totalItems} =useSelector((state)=>state.cart)


    const location = useLocation()

    const [subLinks , setSubLinks] = useState()

    const fetchSubLinks = async()=>{
      try {
        const result = await apiConnector(
          "GET",
          categories.GET_ALL_CATEGORIES_API,
          undefined,
          {},
          {},
          false
        ) // catalog
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
    <div className="sticky top-0 z-50 w-full bg-richblack-900/90 backdrop-blur-md border-b border-richblack-700">
  <div className="mx-auto flex h-16 w-11/12 max-w-maxContent items-center justify-between">

    {/* Logo */}
    <Link to="/" className="flex items-center gap-2">
      <img
        src={curaConnectLogo}
        alt="CuraConnect"
        width={90}
        loading="lazy"
        className="rounded-lg hover:scale-105 transition-transform duration-200"
      />
    </Link>

    {/* Nav Links */}
    <nav>
      <ul className="flex items-center gap-x-14 text-xl font-bold text-richblack-25">
        {NavbarLinks.map((link, index) => (
          <li key={index} className="relative">
            {link.title === "Catalog" ? (
              <div className="group flex cursor-pointer items-center gap-1">
                <span className="group-hover:text-blue-400 transition-colors">
                  {link.title}
                </span>
                <IoIosArrowDropdownCircle className="text-lg group-hover:rotate-180 transition-transform duration-200" />

                {/* Dropdown */}
                <div className="invisible absolute left-1/2 top-[120%] w-[280px] -translate-x-1/2 rounded-xl bg-white p-4 text-richblack-800 opacity-0 shadow-xl
                                transition-all duration-200 group-hover:visible group-hover:opacity-100">

                  {subLinks?.length ? (
                    subLinks.map((sub, i) => (
                      <Link
                        key={i}
                        to={`/catalog/${sub.name}`}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        {sub.name}
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-richblack-400">Loading...</p>
                  )}
                </div>
              </div>
            ) : (
              <Link to={link.path}>
                <p
                  className={`transition-colors hover:text-blue-400 ${
                    matchRoute(link.path)
                      ? "text-blue-500"
                      : "text-richblack-25"
                  }`}
                >
                  {link.title}
                </p>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>

    {/* Auth / Cart */}
    <div className="flex items-center gap-x-5">

      {/* Cart */}
      {user && user?.accountType !== "Doctor" && (
        <Link to="/dashboard/cart" className="relative">
          <AiOutlineShoppingCart className="text-2xl text-richblack-25 hover:text-blue-400 transition" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-pink-500 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
      )}

      {/* Login / Signup */}
      {token === null && (
        <>
          <Link to="/login">
            <button className="rounded-lg px-5 py-2 text-sm font-semibold text-white
                               bg-gradient-to-r from-cyan-400 to-blue-500
                               hover:from-blue-500 hover:to-cyan-400
                               transition-all duration-300">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="rounded-lg px-5 py-2 text-sm font-semibold text-white
                               bg-gradient-to-r from-blue-500 to-purple-500
                               hover:from-purple-500 hover:to-blue-500
                               transition-all duration-300">
              Sign Up
            </button>
          </Link>
        </>
      )}

      {/* Profile */}
      {token !== null && <ProfileDropDown />}
    </div>
  </div>
</div>

  )
}

export default Navbar
