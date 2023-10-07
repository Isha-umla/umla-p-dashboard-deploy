import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Alert from "../components/Alert";
import GuestPopup from "../components/GuestPopup";
import SingleGuestPopup from "../components/SingleGuestPopup";
import useFetch from "../hooks/useFetch";
import { SpinnerGap } from "@phosphor-icons/react";

const dummyAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const OrderHistory = ({ showPopupBox, singleGuestPopupBox, alertBox }) => {
  const { currentPartner } = useSelector((state) => state.partner);

  //-------- navigate to login page --------------

  const navigate = useNavigate();
  useEffect(() => {
    if (!currentPartner) {
      navigate("/");
    }
  }, [currentPartner]);

  //------------fetching order history ---------------------

  const { data, isFetching, isError } = useFetch("/dashboard/getOrderHistory");

  console.log(data); // getting {orders:Array(0)} use it intead of dummyAry

  return (
    <div className="relative flex ">
      <Sidebar />

      <div className="w-full">
        <Navbar />
        <div className=" h-full px-16 py-4 flex flex-col items-center justify-center border">
          {/* main table container start */}
          {isFetching ? (
            <span className="animate-spin text-[#6A5ACD]">
              <SpinnerGap size={70} />
            </span>
          ) : (
            <div className="flex justify-between border rounded-[40px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] bg-white  my-[10px] mx-5 w-full">
              {/* left table start */}
              <div className="flex-1 border-r-2 p-5">
                <table className="w-full">
                  <thead className="border-b-2">
                    <tr className="text-[#646464] text-base">
                      <th className="pb-2 font-medium ">Date</th>
                      <th className="pb-2 font-medium ">Order</th>
                      <th className="pb-2 font-medium ">Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dummyAry.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b-[1px]  last:border-none"
                      >
                        <td className="text-base text-[#252525] font-normal text-center py-5">
                          31/10/23
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

                        <td className=" text-base font-medium text-center text-[#252525]">
                          &#8377; 350
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* left table end */}

              {/* right table start */}
              <div className="flex-1 p-5">
                <table className="w-full">
                  <thead className="border-b-2">
                    <tr className="text-[#646464] text-base">
                      <th className="pb-2 font-medium ">Date</th>
                      <th className="pb-2 font-medium ">Order</th>
                      <th className="pb-2 font-medium ">Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dummyAry.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b-[1px]  last:border-none"
                      >
                        <td className="text-base text-[#252525] font-normal text-center py-5">
                          31/10/23
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

                        <td className=" text-base font-medium text-center text-[#252525]">
                          &#8377; 350
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* right table end */}
            </div>
          )}
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

export default OrderHistory;
