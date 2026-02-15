import React from "react";
import { FooterLink2 } from "../../../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import CuraConnectLogo from "../../../../assets/Images/CuraConnectLogo.png";

// Icons
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Resources = [
  "Health Articles",
  "Medical Blog",
  "Care Guides",
  "Patient Education",
  "Doctor Resources",
  "Research Updates",
  "Health Videos",
];

const Plans = [
  "Patient Plans",
  "Doctor Memberships",
  "Clinic Solutions",
];

const Community = [
  "Doctor Community",
  "Patient Support",
  "Health Events",
];

const Footer = () => {
  return (
    <div className="bg-richblack-800 mt-10">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-full flex flex-col lg:flex-row pb-5 border-richblack-700">

          {/* SECTION 1 */}
          <div className="lg:w-[50%] flex flex-wrap justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">

            {/* Company */}
            <div className="w-[48%] lg:w-[30%] flex flex-col gap-3 mb-7">
              <img
                src={CuraConnectLogo}
                alt="CuraConnect Logo"
                className="object-contain w-30 rounded-xl"
              />

              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>

              <div className="flex flex-col gap-2">
                {["About CuraConnect", "Careers", "For Doctors"].map((ele, i) => (
                  <Link
                    key={i}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                  >
                    {ele}
                  </Link>
                ))}
              </div>

              <div className="flex gap-4 text-lg text-richblack-300 mt-2">
                <FaFacebook />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {/* Resources */}
            <div className="w-[48%] lg:w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => (
                  <Link
                    key={index}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                  >
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>

              <Link
                to="/help-center"
                className="text-[14px] hover:text-richblack-50 transition-all duration-200 mt-2 inline-block"
              >
                Help Center
              </Link>
            </div>

            {/* Plans & Community */}
            <div className="w-[48%] lg:w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => (
                  <Link
                    key={index}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                  >
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => (
                  <Link
                    key={index}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2 (Dynamic Links) */}
          <div className="lg:w-[50%] flex flex-wrap justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="w-[48%] lg:w-[30%] mb-7">
                <h1 className="text-richblack-50 font-semibold text-[16px]">
                  {ele.title}
                </h1>

                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.link}
                      className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
        <div className="flex flex-col lg:flex-row gap-3 w-full justify-between items-center">

          <div className="flex">
            {BottomFooter.map((ele, i) => (
              <Link
                key={i}
                to={ele.split(" ").join("-").toLowerCase()}
                className={`px-3 ${
                  i !== BottomFooter.length - 1 &&
                  "border-r border-richblack-700"
                } hover:text-richblack-50 transition-all duration-200`}
              >
                {ele}
              </Link>
            ))}
          </div>

          <div className="text-center">
            © {new Date().getFullYear()} CuraConnect. All rights reserved.
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
