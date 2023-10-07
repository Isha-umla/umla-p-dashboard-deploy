import { NavLink } from "react-router-dom";

import {
  Handshake,
  HourglassMedium,
  Book,
  ForkKnife,
  UserCircle,
  HouseSimple,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../utils/requestMethods";
import { fetchingSuccess } from "../redux/partnerSlice";

const listArray = [
  {
    optName: "In Progress Meetup",
    icon: <HourglassMedium size={20} />,
    link: "/in_progress_meetup",
  },
  {
    optName: "Upcoming Meetup",
    icon: <Handshake size={20} />,
    link: "/upcoming_meetup",
  },
  {
    optName: "Home",
    icon: <HouseSimple size={20} />,
    link: "/home",
  },
  {
    optName: "Menu",
    icon: <Book size={20} />,
    link: "/menu",
  },
  { optName: "Orders", icon: <ForkKnife size={20} />, link: "/order_history" },
  {
    optName: "Profile",
    icon: <UserCircle size={20} />,
    link: "/profile",
  },
];

const Sidebar = () => {
  const [restaurantData, setRestaurantData] = useState({});
  const [outletBtnStatus, setOutletBtnStatus] = useState(true);
  const token = useSelector((state) => state.partner.currentPartner?.token);
  const dispatch = useDispatch();

  //------------- logout function ----------------------------

  const logout = () => {
    dispatch(fetchingSuccess(null));
  };

  //---------------- fetching restaurant data ------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await publicRequest.get("/dashboard/getOutlet", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRestaurantData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //------------ updating outlet status (open or close)--------------

  const handleOutletStatus = async (e) => {
    setOutletBtnStatus(e);
    try {
      const res = await publicRequest.put(
        "/dashboard/updateOutletStatus",
        { status: !outletBtnStatus ? "open" : "closed" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className=" min-w-[280px] max-w-[300px]">
      <div className="min-w-[280px] min-h-screen bg-[#515ada] flex flex-col justify-between">
        <div>
          {/* restaurant icon and name start */}

          <div className="flex items-center justify-center gap-3 p-3 ">
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
              <img
                src="/dp.jpg"
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-2xl font-semibold text-white border flex  w-auto">
              {restaurantData.outlet?.name}{" "}
            </div>
          </div>

          {/* restaurant icon and name start */}

          {/* you are live container with toggle button start */}

          <div className="flex items-center justify-center mt-5 mb-12 px-4">
            <div className=" flex items-center justify-center bg-white py-[14px] px-[15px] rounded-[68px] w-full gap-1">
              <div className="w-[94px] h-[24px]  text-[#515ADA] text-base font-semibold ">
                You're Live
              </div>

              <div className="flex items-center justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={outletBtnStatus}
                    onChange={(e) => {
                      handleOutletStatus(e.target.checked);
                    }}
                  />
                  <div
                    className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-black dark:peer-focus:ring-black rounded-full peer dark:bg-red-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500`}
                  ></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                </label>
              </div>
            </div>
          </div>

          {/* you are live container with toggle button end */}

          {/* list item names start */}

          <ul className="h-full text-white flex flex-col gap-3">
            {listArray.map((item, index) => (
              <li
                key={index}
                className=" ml-2 rounded-l-[12px] overflow-hidden"
              >
                <NavLink
                  to={item.link}
                  className="flex items-center gap-3 text-base px-3 py-[10px]"
                  style={({ isActive }) => ({
                    color: isActive ? "black" : "white",
                    background: isActive ? "white" : "",
                  })}
                >
                  <span>{item.icon}</span>
                  {item.optName}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* list item names end */}
        </div>

        {/* logout container start */}
        <div
          onClick={logout}
          className="border flex items-center justify-center  my-10 rounded-lg z-20 mx-5 overflow-hidden"
        >
          <button className="text-white border-none outline-none w-full h-full p-2 cursor-pointer hover:bg-white hover:text-[#515ada] hover:font-medium">
            Logout
          </button>
        </div>
        {/* logout container end */}
      </div>
    </aside>
  );
};

export default Sidebar;
