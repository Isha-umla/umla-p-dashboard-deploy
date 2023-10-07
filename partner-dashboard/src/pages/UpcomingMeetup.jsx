import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import GuestPopup from "../components/GuestPopup";
import SingleGuestPopup from "../components/SingleGuestPopup";
import useFetch from "../hooks/useFetch";
import { CheckCircle } from "@phosphor-icons/react";
import { allotTablesSuccess } from "../redux/allotTableSlice";
import { publicRequest } from "../utils/requestMethods";

const dummyAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const UpcomingMeetup = ({ showPopupBox, singleGuestPopupBox, alertBox }) => {
  const [toggleView, setToggleView] = useState(false);
  const [showInput, setShowInput] = useState([]); // to show allot table input box
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);

  // To select a date through the calendar
  const [selected, setSelected] = useState(null);

  // console.log(selected);

  const { currentPartner } = useSelector((state) => state.partner);
  const token = currentPartner?.token;

  const dispatch = useDispatch();

  //navigate to login page
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentPartner) {
      navigate("/");
    }
  }, [currentPartner]);

  const formatDate = (time) => {
    let date = time.toISOString().slice(0, 10);
    let timeStamp = time.getHours() + ":" + time.getMinutes();
    let formattedDate = date.split("-").reverse().join("/");

    return (
      <>
        <td className="text-base text-[#252525] font-normal text-center py-5">
          {formattedDate}
        </td>

        <td className="text-base font-normal text-[#252525] text-center">
          {timeStamp}
        </td>
      </>
    );
  };

  const handleOptionChange = (e, index) => {
    const selectedValue = e.target.value;

    const selectedArray = [...selectedOption];
    selectedArray[index] = selectedValue;
    setSelectedOption(selectedArray);

    if (selectedValue === "allot-table") {
      const updatedArray = [...showInput];
      updatedArray[index] = true;
      setShowInput(updatedArray);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const updateArrivalTable = async (tableData) => {
    try {
      const res = await publicRequest.put("/dashboard/allotTable", tableData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(allotTablesSuccess(res.data));
      setInputValue("");
      window.location.reload(true);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: upcomingArrival } = useFetch("/dashboard/getUpcomingArrivals");

  useEffect(() => {
    if (upcomingArrival?.arrivals?.length > 0) {
      const newArray = Array(upcomingArrival.arrivals.length).fill(false);
      const newArray2 = Array(upcomingArrival.arrivals.length).fill("");

      setShowInput(newArray);
      setSelectedOption(newArray2);
    }
  }, [upcomingArrival]);

  return (
    <div className="relative flex ">
      <Sidebar />

      <div className="w-full">
        <Navbar setToggleView={setToggleView} toggleView={toggleView} />
        <div className=" h-full px-16 py-4">
          {/* main table container start */}
          <div className="border rounded-[40px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] bg-white p-5 my-[10px] mx-5">
            {!toggleView ? (
              <table className="w-full">
                <thead className="border-b-2">
                  <tr className="text-[#646464] font-normal text-base">
                    <th className="pb-2 font-normal ">Date</th>
                    <th className="pb-2 font-normal ">Time</th>
                    <th className="pb-2 font-normal ">Person 1</th>
                    <th className="pb-2 font-normal ">Person 2</th>
                    <th className="pb-2 font-normal ">Reserve Table</th>
                  </tr>
                </thead>

                <tbody>
                  {upcomingArrival?.arrivals.map((arrival, index) => (
                    <tr
                      key={index}
                      className="border-b-[1px] last:border-none text-center"
                      style={{ height: "50px" }}
                    >
                      
                      {formatDate(new Date(arrival.time))}
                      <td className="text-base font-normal text-[#252525] text-center">
                        {arrival.guest[0]?.name}
                      </td>
                      <td className="text-base font-normal text-[#252525] text-center">
                        {arrival.guest[1]?.name}
                      </td>
                      <td className="text-base font-normal text-[#252525] text-center">
                        {arrival.table === "unassigned" ? (
                          <div className="text-[#646464] py-[9px] px-[6px] font-medium text-base bg-[#e4e3e3] w-fit text-center rounded-[4px]">
                            {showInput[index] ? (
                              <div className="flex items-center bg-white">
                                <input
                                  type="text"
                                  className="text-[#646464] py-[9px] px-[6px] font-medium text-base  w-fit text-center rounded-[4px]"
                                  placeholder="Enter Table No."
                                  value={inputValue}
                                  onChange={handleInputChange}
                                />
                                <button
                                  className=""
                                  onClick={() =>
                                    updateArrivalTable({
                                      arrivalId: arrival._id,
                                      table: inputValue,
                                    })
                                  }
                                >
                                  <CheckCircle size={30} />
                                </button>
                              </div>
                            ) : (
                              <select
                                className="text-[#646464] py-[9px] px-[6px] font-medium text-base bg-[#e4e3e3] w-fit text-center rounded-[4px]"
                                value={selectedOption[index]}
                                onChange={(e) => handleOptionChange(e, index)}
                              >
                                <option value="">Set Table Status</option>
                                <option
                                  value="walk-in"
                                  onClick={() =>
                                    updateArrivalTable({
                                      arrivalId: arrival._id,
                                      table: "walk-in",
                                    })
                                  }
                                >
                                  Walk-In
                                </option>
                                <option value="allot-table">Allot Table</option>
                              </select>
                            )}
                          </div>
                        ) : (
                          <div>{arrival.table} </div>
                        )}
                      </td>
                    </tr>
                  ))}

                  {dummyAry.map((item, index) => (
                    <tr key={index} className="border-b-[1px] last:border-none">
                      <td className="text-base text-[#252525] font-normal text-center py-5">
                        31/10/23
                      </td>

                      <td className="text-base font-normal text-[#252525] text-center">
                        11:00 PM
                      </td>

                      <td className="text-base font-normal text-[#252525] text-center">
                        Satya Thakur
                      </td>

                      <td className="text-base font-normal text-[#252525] text-center">
                        Manish Ranjan
                      </td>

                      <td className="text-base font-normal text-[#252525] text-center">
                        21
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-between gap-5 border">
                <div className="w-[65%] border">Graph Section</div>

                <div className=" w-[35%]">
                  <h3 className="text-base font-semibold mb-2  ml-2">
                    Select Date
                  </h3>
                  <div className="border border-[#E7E7E7] rounded-lg flex items-center justify-center m-0">
                    <DayPicker
                      mode="single"
                      selected={selected}
                      onSelect={setSelected}
                    />
                  </div>
                </div>
              </div>
            )}
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

export default UpcomingMeetup;
