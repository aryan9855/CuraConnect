import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../HomePage/common/Loader'

function EnrolledHealthPrograms() {

    const {token} = useSelector((state) => state.auth)
    const [enrolledHealthPrograms ,setEnrolledHealthPrograms] = useState(null)

    const getEnrolledHealthProgram = async()=>{
        try {
            const response = await getUserEnrolledHealthPrograms(token)
            setEnrolledHealthPrograms(response)
        } catch (error) {
            console.log("unable to fetch health Programs")
        }
    }
useEffect(()=>{
    getEnrolledHealthProgram()
},[])


  return (
    <div className='text-white'>
      <div> Enrolled Health Programs</div>
      {
        !enrolledHealthPrograms ? (
            <Loader/>
        ):(
            !enrolledHealthPrograms.length ?(<p> You have not enrolled in any health program yet</p>)
            :(
                <div>
                    <div>
                        <p>Health Program Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>
                    {/* Cards  */}
                    {
                        enrolledHealthPrograms.map((healthProgram,index)=>{
                            <div>
                                <div>
                                    <img src={healthProgram.thumbnail}/>
                                    <div>
                                        <p>{healthProgram.healthProgramName}</p>
                                        <p>{healthProgram.healthProgramDescription}</p>
                                    </div>
                                </div>
                                        
                                <div>
                                {healthProgram?.totalDuration}
                                </div>

                                <div>
                                    <p>Progress:{healthProgram.progress || 0}</p>
                                    <ProgressBar
                                        completed={healthProgram.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}/>
                                </div>

                            </div>
                        })
                    }
                </div>
            )
        )
      }

    </div>
  )
}

export default EnrolledHealthPrograms
