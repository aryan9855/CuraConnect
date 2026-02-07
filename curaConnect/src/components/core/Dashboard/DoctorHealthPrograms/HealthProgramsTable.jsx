import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Thead, Tr, Th, Td } from "react-super-responsive-table";

import { HEALTHPROGRAM_STATUS } from "../../../../utils/constants";
import ConfirmationModel from "../../HomePage/common/ConfirmationModel";
import {
  fetchDoctorHealthPrograms,
  deleteHealthProgram,
} from "../../../../services/operations/healthProgramDetailsAPI";

function HealthProgramsTable({ healthPrograms, setHealthPrograms }) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [confirmationModel, setConfirmationModel] = useState(null);

  const handleHealthProgramDelete = async (healthProgramId) => {
    setLoading(true);

    await deleteHealthProgram({ healthProgramId }, token);

    const result = await fetchDoctorHealthPrograms(token);
    if (result) {
      setHealthPrograms(result);
    }

    setConfirmationModel(null);
    setLoading(false);
  };

  return (
    <div className="text-white">
      <Table className="w-full">
        <Thead>
          <Tr>
            <Th colSpan="4" className="pb-6">
              <div
                className="
          backdrop-blur-md bg-white/5
          border border-white/10
          rounded-2xl shadow-lg
          px-8 py-5
        "
              >
                <div className="grid grid-cols-4 text-gray-300 font-semibold text-lg">
                  <span>Health Program</span>
                  <span className="text-center">Duration</span>
                  <span className="text-center">Price</span>
                  <span className="text-center">Actions</span>
                </div>
              </div>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {healthPrograms.length === 0 ? (
            <Tr>
              <Td colSpan="4" className="text-center py-10 text-gray-400">
                No Health Programs Found
              </Td>
            </Tr>
          ) : (
            healthPrograms.map((healthProgram) => (
              <Tr key={healthProgram._id}>
                <Td colSpan="4" className="py-6">
                  <div
                    className="
                      flex justify-between items-center
                      backdrop-blur-md bg-white/5
                      border border-white/10
                      rounded-2xl shadow-xl
                      p-6
                      hover:bg-white/10
                      transition-all duration-300
                    "
                  >
                    {/* LEFT SECTION */}
                    <div className="flex gap-6 items-center flex-1">
                      <img
                        src={healthProgram?.thumbnail}
                        alt="thumbnail"
                        className="h-[120px] w-[180px] rounded-xl object-cover shadow-md"
                      />

                      <div className="flex flex-col gap-2">
                        <p className="text-xl font-semibold text-white">
                          {healthProgram.healthProgramName}
                        </p>

                        <p className="text-sm text-gray-300 max-w-md">
                          {healthProgram.healthProgramDescription}
                        </p>

                        {healthProgram.status === HEALTHPROGRAM_STATUS.DRAFT ? (
                          <span className="text-pink-400 font-medium">
                            ● Drafted
                          </span>
                        ) : (
                          <span className="text-yellow-400 font-medium">
                            ● Published
                          </span>
                        )}
                      </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex items-center gap-12">
                      <p className="text-white font-medium">2hr 30min</p>

                      <p className="text-white font-medium">
                        ₹ {healthProgram.price}
                      </p>

                      <div className="flex gap-3">
                        <button
                          disabled={loading}
                          onClick={() =>
                            navigate(
                              `/dashboard/edit-healthProgram/${healthProgram._id}`,
                            )
                          }
                          className="
                            bg-blue-500 hover:bg-blue-600
                            px-4 py-2 rounded-lg
                            transition
                          "
                        >
                          Edit
                        </button>

                        <button
                          disabled={loading}
                          onClick={() =>
                            setConfirmationModel({
                              text1:
                                "Do you want to delete this health program?",
                              text2:
                                "All the data related to this health program will be permanently deleted.",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                                handleHealthProgramDelete(healthProgram._id),
                              btn2Handler: () => setConfirmationModel(null),
                            })
                          }
                          className="
                            bg-red-500 hover:bg-red-600
                            px-4 py-2 rounded-lg
                            transition
                          "
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationModel && <ConfirmationModel modelData={confirmationModel} />}
    </div>
  );
}

export default HealthProgramsTable;
