import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import {
  ArrowRight,
  CaretDown,
  CaretUp,
  CheckCircle,
  SpinnerGap,
  TrendUp,
  User,
  Warning,
  X,
} from "@phosphor-icons/react";
import useFetch from "../hooks/useFetch.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert.jsx";
import GuestPopup from "../components/GuestPopup.jsx";
import SingleGuestPopup from "../components/SingleGuestPopup.jsx";
import { socket } from "../components/Socket";
import Countdown from "react-countdown";
import { publicRequest } from "../utils/requestMethods.js";
import { allotTablesSuccess } from "../redux/allotTableSlice.js";

const listOfIssues = [
  " Physical assault: The man might become violent and physically attack the woman.",
  "Stalking: The man might follow the woman around the restaurant or refuse to leave her alone.",
  "Verbal abuse: The man might shout at the woman, call her names, or make insulting remarks.",
  "Disruptive behavior: The man might behave in a loud or obnoxious manner, causing a disturbance to other diners.",
];

const Home = ({ showPopupBox, singleGuestPopupBox, alertBox }) => {
  const [showDropDownListBox, setShowDropDownListBox] = useState(false);
  const [showDropDownList, setShowDropDownList] = useState(true);
  const [dropDownListContent, setDropDownListContent] = useState("");
  const [revenue, setRevenue] = useState({});

  const navigate = useNavigate();
  const { currentPartner } = useSelector((state) => state.partner);
  const token = currentPartner?.token;

  const [arrivalData, setArrivalData] = useState({
    table: "21",
    guest: [
      {
        name: "Isha",
      },
    ],
  });

  const [orderData, setOrderData] = useState({
    table: "21",
    // menu
    guest: [
      {
        name: "Isha",
      },
    ],
  });

  const [selectedOption, setSelectedOption] = useState([]);
  const [showInput, setShowInput] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Handle changes when a user selects an option
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

  //fetch revenue data on page load
  const { data, isFetching, isError } = useFetch("/dashboard/getRevenue");

  //navigate to login page
  useEffect(() => {
    if (!currentPartner) {
      socket.connect();
      navigate("/");
    }
  }, [currentPartner]);

  // fetch home arrivalData
  const { data: activeArrival } = useFetch("/dashboard/getActiveArrivals");

  const dispatch = useDispatch();

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

  const formatDate = (time) => {
    let date = time.toISOString().slice(0, 10);
    let timeStamp = time.getHours() + ":" + time.getMinutes();

    let formattedDate = date.split("-").reverse().join("/");

    return (
      <div className="flex flex-col items-center justify-center ">
        <span className="text-[#646464] text-sm font-medium">
          {formattedDate}
        </span>
        <span className="text-black font-medium text-base">{timeStamp}</span>
      </div>
    );
  };

  const { data: upcomingArrival } = useFetch("/dashboard/getUpcomingArrivals");
  // console.log(upcomingArrival);

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
        <Navbar home={location} />

        <div className=" h-full px-16 py-4">
          {/* first container start */}

          <div className="flex items-center justify-between gap-5">
            <div className="rounded-[10px] py-5 px-12 shadow-[0px_4px_23px_1px_rgba(0,0,0,0.07)] flex flex-col items-center justify-center h-[108px]">
              <span className="text-[15px] text-[#646464] font-medium min-w-max">
                Today's Booking
              </span>
              <span className="text-[#515ADA] text-[30px] fom">
                {isFetching ? (
                  <span className="animate-spin">
                    <SpinnerGap size={35} />
                  </span>
                ) : (
                  data?.todayBooking
                )}
              </span>
            </div>

            <div className="rounded-[10px] py-5 px-12 shadow-[0px_4px_23px_1px_rgba(0,0,0,0.07)] flex flex-col items-center justify-center h-[108px]">
              <span className="text-[15px] text-[#646464] min-w-max">
                Today's Revenue
              </span>
              <span className="text-[#515ADA] text-[30px] min-w-max">
                {isFetching ? (
                  <span className="animate-spin">
                    <SpinnerGap size={35} />
                  </span>
                ) : (
                  <span> &#8377; {data?.todayRevenue}</span>
                )}
              </span>
            </div>

            <div className="rounded-[10px] py-5 px-12 shadow-[0px_4px_23px_1px_rgba(0,0,0,0.07)] flex flex-col items-center justify-center  h-[108px]">
              <span className="text-[15px] text-[#646464] min-w-max">
                Total Revenue
              </span>
              <span className="text-[#515ADA] text-[30px] min-w-max">
                {isFetching ? (
                  <span className="animate-spin">
                    <SpinnerGap size={35} />
                  </span>
                ) : (
                  <span> &#8377; {data?.todayRevenue}</span>
                )}
              </span>
            </div>

            <div className="rounded-[10px] py-5 px-12 shadow-[0px_4px_23px_1px_rgba(0,0,0,0.07)] flex flex-col items-center justify-center h-[108px]">
              <span className="text-[15px] text-[#646464] min-w-max">
                Customer this months
              </span>

              <div className="flex items-center justify-center gap-2 ">
                <span className="text-[#515ADA] text-[30px]">
                  {isFetching ? (
                    <span className="animate-spin">
                      <SpinnerGap size={35} />
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {data?.monthCustomers}
                      <span className="text-[#5DB083]">
                        <TrendUp size={30} />
                      </span>
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* first container end */}

          {/* middle container start */}

          <div className="border shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[30px] mt-6 p-6">
            <div className="flex justify-between">
              <span className="font-semibold text-base">ORDER ON TABLE</span>

              <div className="flex items-center gap-2 font-semibold text-base">
                <Link to="/in_progress_meetup">View All</Link>
                <ArrowRight size={16} />
              </div>
            </div>

            <div className="flex items-center justify-between py-5 px-7 border rounded-[15px] my-4">
              <span className="border bg-[#ECBC40] p-[6px] rounded-[4px]">
                21
              </span>

              <div className="flex items-center justify-center gap-5 text-[#515ADA]">
                <User size={24} />
                <User size={24} weight="fill" />
              </div>

              <span className="border p-[10px] rounded-[12px] font-normal">
                15:00
              </span>
              <span>-</span>
              <span>-</span>

              <button className="border border-[#515ADA] py-1 px-2 rounded-[8px] text-[#515ADA] text-sm font-medium">
                Done
              </button>
            </div>

            {activeArrival?.arrivals.map((arrival, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-5 px-7 border rounded-[15px] my-4"
              >
                <span className=" bg-[#40EC8F] p-[6px] rounded-[4px]">
                  {arrival.table}
                </span>

                <div className="flex items-center justify-center gap-5 text-[#515ADA]">
                  {arrival.guest[0] ? (
                    <User size={24} weight="fill" />
                  ) : (
                    <User size={24} />
                  )}
                  {arrival.guest[1] ? (
                    <User size={24} weight="fill" />
                  ) : (
                    <User size={24} />
                  )}
                </div>

                {arrival.guest.lenght === 1 ? (
                  <Countdown date={new Date(arrival.time) + 15 * 60 * 1000} />
                ) : (
                  <div className="flex flex-col items-start gap-1 font-normal text-[#252525]">
                    {arrival.order?.item?.map((item) => {
                      <span>{item.name}</span>;
                    })}
                  </div>
                )}

                <span className="text-[#252525] text-base font-normal">
                  &#8377; {arrival.total}
                </span>

                {arrival.guest.length === 1 ? (
                  <span>-</span>
                ) : (
                  <span>Under Process</span>
                )}

                {arrival.guest.length === 2 && (
                  <button className="border border-[#515ADA] py-1 px-2 rounded-[8px] text-[#515ADA] text-sm font-medium">
                    Done
                  </button>
                )}
              </div>
            ))}

            <div className="flex items-center justify-between py-5 px-7 border rounded-[15px] my-4">
              <span className=" bg-[#40EC8F] p-[6px] rounded-[4px]">21</span>

              <div className="flex items-center justify-center gap-5 text-[#515ADA]">
                <User size={24} weight="fill" />
                <User size={24} weight="fill" />
              </div>

              <div className="flex flex-col items-start gap-1 font-normal text-[#252525]">
                <span>1x Cappuccino</span>
                <span>1x Latte</span>
              </div>

              <span className="text-[#252525] text-base font-normal">
                &#8377; 350
              </span>

              <span>Under Process</span>

              <button className="border border-[#515ADA] py-1 px-2 rounded-[8px] text-[#515ADA] text-sm font-medium">
                Done
              </button>
            </div>

            <div className="flex items-center justify-between py-5 px-7 border rounded-[15px] my-4">
              <span className=" bg-[#40EC8F] p-[6px] rounded-[4px]">21</span>

              <div className="flex items-center justify-center gap-5 text-[#515ADA]">
                <User size={24} weight="fill" />
                <User size={24} weight="fill" />
              </div>

              <div className="flex flex-col items-start gap-1 font-normal text-[#252525]">
                <span>1x Cappuccino</span>
                <span>1x Latte</span>
              </div>

              <span className="text-[#252525] text-base font-normal">
                &#8377; 350
              </span>
              <span>Under Process</span>

              <button className="border border-[#515ADA] py-1 px-2 rounded-[8px] text-[#515ADA] text-sm font-medium">
                Done
              </button>
            </div>

            <div className="flex items-center justify-between py-[15px] px-8 border rounded-[15px] bg-[#EF6969]">
              <span className=" bg-[#40EC8F] p-[6px] rounded-[4px]">21</span>

              <div className="flex items-center justify-center gap-4">
                <Warning size={26} weight="fill" className="text-[#ECBC40]" />
                <span className="text-white text-xl font-semibold">
                  Raised an Alarm
                </span>
              </div>

              <button
                onClick={() => setShowDropDownListBox(true)}
                className="text-base font-semibold text-white underline underline-offset-2 border-none outline-none"
              >
                Resolve Issue?
              </button>
            </div>
          </div>

          {/* middle container end */}

          {/* last container start */}

          <div className="border rounded-[30px] mt-6 p-6">
            <div className="flex justify-between mb-4">
              <span className="font-semibold text-base">New Bookings</span>
              <div className="flex items-center gap-2 font-semibold text-base">
                <Link to="/upcoming_meetup">View All</Link>
                <ArrowRight size={16} />
              </div>
            </div>

            {upcomingArrival?.arrivals.map((arrival, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-5 border rounded-[9px] p-3"
              >
                {formatDate(new Date(arrival.time))}
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
                  <div>Table: {arrival.table} </div>
                )}
              </div>
            ))}
          </div>
          {/* last container end */}
        </div>
      </div>

      {/* drop down list container start */}
      {showDropDownListBox && (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center  p-5 bg-white w-[604px] h-[475px] rounded-[9px] ">
            {dropDownListContent ? (
              <div className="p-5">
                <div className=" flex items-center justify-end">
                  <button
                    onClick={() => {
                      setShowDropDownListBox(false);
                      setDropDownListContent("");
                    }}
                    className="cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <h2 className="text-[21px] font-medium">What was the issue</h2>

                <div className=" border border-[#9C9C9C] rounded-[9px] flex items-center justify-between px-3 py-2 mt-1">
                  <span className="text-black text-base font-normal mr-2">
                    {dropDownListContent}
                  </span>

                  <div className="flex items-center justify-center">
                    {showDropDownList ? (
                      <button onClick={() => setShowDropDownList(false)}>
                        <CaretUp size={20} fill="#7B7B7B" />
                      </button>
                    ) : (
                      <button onClick={() => setShowDropDownList(true)}>
                        <CaretDown size={20} fill="#7B7B7B" />
                      </button>
                    )}
                  </div>
                </div>

                <h2 className="text-[21px] font-medium my-10">
                  How did you resolve this
                </h2>

                <div className="border-b ">
                  <input
                    type="text"
                    placeholder="Type your answer here"
                    className="placeholder:text-[#7B7B7B] placeholder:font-normal placeholder:text-base px-1 py-2 w-full outline-none"
                  />
                </div>

                <button className="bg-[#6A5ACD] w-full text-white py-[18px] px-[90px] rounded-[10px] cursor-pointer border-none outline-none mt-20">
                  Submit
                </button>
              </div>
            ) : (
              <div className="p-5">
                <div className=" flex items-center justify-end">
                  <button
                    onClick={() => setShowDropDownListBox(false)}
                    className="cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <h2 className="text-[21px] font-medium">What was the issue</h2>

                <div className=" border rounded-[9px] flex items-center justify-between px-3 py-2 mt-1">
                  <span className="text-[#7B7B7B] text-base font-normal">
                    Select Your Issue
                  </span>
                  <div className="flex items-center justify-center">
                    {showDropDownList ? (
                      <button onClick={() => setShowDropDownList(false)}>
                        <CaretUp size={20} fill="#7B7B7B" />
                      </button>
                    ) : (
                      <button onClick={() => setShowDropDownList(true)}>
                        <CaretDown size={20} fill="#7B7B7B" />
                      </button>
                    )}
                  </div>
                </div>

                {showDropDownList && (
                  <div className="border rounded-b-[9px] mt-3">
                    <div className="border-b ">
                      <input
                        type="text"
                        placeholder={
                          dropDownListContent
                            ? dropDownListContent
                            : "Type Here...."
                        }
                        className="border-none outline-none w-full h-full p-2 placeholder:text-[#7B7B7B] text-sm "
                      />
                    </div>

                    <ul className="list-none">
                      {listOfIssues.map((issue, index) => (
                        <li
                          key={index}
                          className="border-b p-2 text-sm font-normal cursor-pointer "
                          onClick={(e) =>
                            setDropDownListContent(e.target.innerText)
                          }
                        >
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {/* drop down list container end */}

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

export default Home;
