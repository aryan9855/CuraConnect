import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AiFillCaretDown, AiOutlinePlus } from "react-icons/ai"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/healthProgramDetailsAPI"

import { setHealthProgram } from "../../../../../slices/healthProgramSlice"

import ConfirmationModel from "../../../HomePage/common/ConfirmationModel"
import SubSectionModal from "./SubSectionModal"

function NestedView({ handleChangeEditSectionName }) {
  const { healthProgram } = useSelector((state) => state.healthProgram)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const sections = healthProgram?.healthProgramContent || []

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      { sectionId, healthProgramId: healthProgram._id },
      token
    )

    if (result) dispatch(setHealthProgram(result))
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection(
      { subSectionId, sectionId },
      token
    )

    if (result) dispatch(setHealthProgram(result))
    setConfirmationModal(null)
  }

  return (
    <>
      <div className="rounded-lg bg-richblack-700 p-6 px-8">

        {sections.map((section) => (
          <details key={section._id} open>

            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">

              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>

              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>

                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All lectures will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>

                <AiFillCaretDown className="text-xl text-richblack-300" />
              </div>
            </summary>

            <div className="px-6 pb-4">

              {section.SubSection?.map((data) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>

                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Lecture?",
                          text2: "This lecture will be deleted permanently.",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <AiOutlinePlus />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add
        />
      )}

      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view
        />
      )}

      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit
        />
      )}

      {confirmationModal && (
        <ConfirmationModel modalData={confirmationModal} />
      )}
    </>
  )
}

export default NestedView
