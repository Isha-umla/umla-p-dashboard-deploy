import { PencilSimple, Trash } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import GuestPopup from "../components/GuestPopup";
import SingleGuestPopup from "../components/SingleGuestPopup";
import useFetch from "../hooks/useFetch";
const dummyAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const InProgressMeetup = ({ showPopupBox, singleGuestPopupBox, alertBox }) => {
  const { currentPartner } = useSelector((state) => state.partner);
  //navigate to login page
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentPartner) {
      navigate("/");
    }
  }, [currentPartner]);

  const { data: activeArrival } = useFetch("/dashboard/getActiveArrivals");

  const formatDate = (time) => {
    let date = time.toISOString().slice(0, 10);
    let formattedDate = date.split("-").reverse().join("/");

    return (
      <>
        <td className="text-base font-normal text-[#252525] text-center">
          {formattedDate}
        </td>
      </>
    );
  };

  return (
    <div className="relative flex ">
      <Sidebar />

      <div className="w-full">
        <Navbar />
        <div className=" h-full px-16 py-4 border">
          {/* main table container start */}
          <div className="border rounded-[40px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] bg-white p-5 my-[10px] mx-5">
            <table className="w-full">
              <thead className="border-b-2">
                <tr className="text-[#646464] font-normal text-base">
                  <th className="pb-2 font-normal ">Date</th>
                  <th className="pb-2 font-normal ">Person 1</th>
                  <th className="pb-2 font-normal ">Person 2</th>
                  <th className="pb-2 font-normal ">Order</th>
                  <th className="pb-2 font-normal ">Price</th>
                  <th className="pb-2 font-normal ">Table</th>
                  <th className="pb-2 font-normal ">Status</th>
                  <th className="pb-2 font-normal ">Action</th>
                </tr>
              </thead>

              <tbody>
                {activeArrival?.arrivals.map((arrival, index) => 
                  <tr key={index} className="border-b-[1px] last:border-none">
                    <td className="text-base text-[#252525] font-normal text-center py-5">
                      {formatDate(new Date(arrival.time))}
                    </td>

                    <td className="text-base font-normal text-[#252525] text-center">
                      {arrival.guest[0]?.name}
                    </td>

                    <td className="text-base font-normal text-[#252525] text-center">
                      {arrival.guest[1]?.name}
                    </td>

                    <td className="text-center">
                      <div className="flex flex-col justify-center items-center">
                        {arrival.order?.item?.map((item) => {
                          <span className="text-[#252525] font-normal text-base">
                            {item.name}
                          </span>
                        })}
                      </div>
                    </td>

                    <td className=" text-base font-normal text-center text-[#252525]">
                      &#8377; {arrival.total}
                    </td>

                    <td className="text-base font-normal text-[#252525] text-center">
                      {arrival.table}
                    </td>

                    {arrival.guest.length === 1 ? (
                    <td className="text-base font-normal text-[#252525] text-center">
                      -
                    </td>
                    ) : (
                    <td className="text-base font-normal text-[#252525] text-center">
                      Under Process
                    </td>
                    )}

                    <td>
                      <div className="flex items-center justify-center w-full h-full">
                        <button className="flex items-center justify-center border border-[#515ADA] py-1 px-3 rounded-[11px] text-sm font-normal text-[#515ADA] w-[53px] h-[30px]">
                          Done
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                )}
                {/* </tbody> */}

                {dummyAry.map((item, index) => (
                  <tr key={index} className="border-b-[1px] last:border-none">
                    <td className="text-base text-[#252525] font-normal text-center py-5">
                      31/10/23
                    </td>

                    <td className="text-base font-normal text-[#252525] text-center">
                      Satya Thakur
                    </td>

                    <td className="text-base font-normal text-[#252525] text-center">
                      Manish Ranjan
                    </td>

                    <td className="text-center">
                      <div className="flex flex-col justify-center items-center">
                        <span className="text-[#252525] font-normal text-base">
                          1x Margherita
                        </span>
                        <span className="text-[#252525] font-normal text-base">
                          1x Italino Pizza
                        </span>
                      </div>
                    </td>

                    <td className=" text-base font-normal text-center text-[#252525]">
                      &#8377; 350
                    </td>

                    <td className="text-base font-normal text-[#252525] text-center">
                      21
                    </td>

                    <td className="text-base font-normal text-[#252525] text-center">
                      Under Process
                    </td>

                    <td>
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="flex items-center justify-center border border-[#515ADA] py-1 px-3 rounded-[11px] text-sm font-normal text-[#515ADA] w-[53px] h-[30px]">
                          Done
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* main table container end */}
        </div>
      </div>

      {/* middle screen popup box start */}

      {showPopupBox && <GuestPopup />}

      {/* middle screen popup box end */}

      {/* middle screen popup box for single user start */}

      {singleGuestPopupBox && <SingleGuestPopup />}

      {/* middle screen popup box for single user end */}

      {/* Alert box start */}
      {alertBox && <Alert />}
      {/* Alert box start */}
    </div>
  );
};

export default InProgressMeetup;
