import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import GuestPopup from "../components/GuestPopup";
import SingleGuestPopup from "../components/SingleGuestPopup";

const Profile = ({ showPopupBox, singleGuestPopupBox, alertBox }) => {
  const [isProfileDetailEditable, setIsProfileDetailEditable] = useState(false);
  const [isAccountDetailEditable, setIsAccountDetailEditable] = useState(false);
  const [isImageEditable, setIsImageEditable] = useState(false);

  const [details, setDetails] = useState({});

  const handleProfileDetailClick = (e) => {
    e.preventDefault();
    setIsProfileDetailEditable(!isProfileDetailEditable);
  };

  const handleAccountDetailClick = (e) => {
    e.preventDefault();
    setIsAccountDetailEditable(!isAccountDetailEditable);
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    setIsImageEditable(!isImageEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const { currentPartner } = useSelector((state) => state.partner);
  //navigate to login page
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentPartner) {
      navigate("/");
    }
  }, [currentPartner]);
  return (
    <div className="relative flex ">
      <Sidebar />

      <div className="w-full">
        <Navbar />

        <div className=" h-full px-16 py-4m flex items-center justify-center">
          <form className=" border-2 border-gray-400 border-opacity-40 p-4 m-4 rounded-3xl w-[1156px]">
            <div className=" flex justify-between m-4">
              <h1 className=" font-semibold text-2xl">Profile Details</h1>

              <button
                onClick={handleProfileDetailClick}
                className="border-2 border-[#515ADA] border-opacity-60 text-[#515ADA] px-2 py-1 flex items-center gap-2 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M14.2069 5.0861L11.4144 2.29297C11.3215 2.20009 11.2113 2.12641 11.0899 2.07614C10.9686 2.02587 10.8385 2 10.7072 2C10.5759 2 10.4458 2.02587 10.3245 2.07614C10.2031 2.12641 10.0929 2.20009 10 2.29297L2.29313 10.0005C2.19987 10.093 2.12593 10.2031 2.0756 10.3245C2.02528 10.4458 1.99959 10.576 2.00001 10.7073V13.5005C2.00001 13.7657 2.10536 14.02 2.2929 14.2076C2.48043 14.3951 2.73479 14.5005 3.00001 14.5005H5.79313C5.9245 14.5009 6.05464 14.4752 6.17599 14.4249C6.29735 14.3746 6.40748 14.3006 6.50001 14.2073L14.2069 6.50047C14.2998 6.40761 14.3734 6.29736 14.4237 6.17602C14.474 6.05468 14.4999 5.92463 14.4999 5.79329C14.4999 5.66195 14.474 5.53189 14.4237 5.41055C14.3734 5.28921 14.2998 5.17896 14.2069 5.0861ZM5.79313 13.5005H3.00001V10.7073L8.50001 5.20735L11.2931 8.00047L5.79313 13.5005ZM12 7.29297L9.20688 4.50047L10.7069 3.00047L13.5 5.79297L12 7.29297Z"
                    fill="#515ADA"
                  />
                </svg>
                {isProfileDetailEditable ? "Done" : "Edit"}
              </button>
            </div>

            <div className=" m-8">
              <div className=" my-4 font-medium  ">
                Category
                <span className="py-2 mx-4 px-12 rounded-full  border border-[#646464] border-opacity-50 ">
                  Bar
                </span>
              </div>

              <div className=" grid grid-cols-2 gap-4 ">
                <div className=" font-medium my-2">
                  Restaurant Name
                  <input
                    onChange={handleChange}
                    value={details["restaurantName"]}
                    name="restaurantName"
                    disabled={!isProfileDetailEditable}
                    type="text"
                    className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                    placeholder="Restaurant Name"
                  />
                </div>

                <div className=" font-medium my-2">
                  Manager Name
                  <input
                    onChange={handleChange}
                    value={details["managerName"]}
                    name="managerName"
                    disabled={!isProfileDetailEditable}
                    type="text"
                    className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                    placeholder="Manager Name"
                  />
                </div>

                <div className=" font-medium ">
                  Email Address
                  <input
                    onChange={handleChange}
                    value={details["email"]}
                    name="email"
                    disabled={!isProfileDetailEditable}
                    type="email"
                    className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                    placeholder="Email"
                  />
                </div>

                <div className=" font-medium ">
                  Manager Contact Number
                  <input
                    onChange={handleChange}
                    value={details["contactNumber"]}
                    name="contactNumber"
                    disabled={!isProfileDetailEditable}
                    type="tel"
                    className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                    placeholder="+91-72452179"
                  />
                </div>

                <div className=" font-medium ">
                  Working Hours
                  <div className="flex items-center gap-2">
                    <input
                      onChange={handleChange}
                      value={details["workFrom"]}
                      name="workFrom"
                      disabled={!isProfileDetailEditable}
                      type="time"
                      className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                      placeholder="11:00"
                    />
                    To
                    <input
                      onChange={handleChange}
                      value={details["workTo"]}
                      name="workTo"
                      disabled={!isProfileDetailEditable}
                      type="time"
                      className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                      placeholder="22:00"
                    />
                  </div>
                </div>

                <div className=" font-medium ">
                  City
                  <input
                    onChange={handleChange}
                    value={details["city"]}
                    name="city"
                    disabled={!isProfileDetailEditable}
                    type="text"
                    className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                    placeholder="City"
                  />
                </div>
              </div>

              <div className=" font-medium ">
                Address
                <input
                  onChange={handleChange}
                  value={details["address"]}
                  name="address"
                  disabled={!isProfileDetailEditable}
                  type="text"
                  className="p-8 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                  placeholder="Address"
                />
              </div>
            </div>

            <div className=" flex justify-between m-4">
              <h1 className=" font-semibold text-2xl">Account Details</h1>
              <button
                onClick={handleAccountDetailClick}
                className="border-2 border-[#515ADA] border-opacity-60 text-[#515ADA] px-2 py-1 flex items-center gap-2 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M14.2069 5.0861L11.4144 2.29297C11.3215 2.20009 11.2113 2.12641 11.0899 2.07614C10.9686 2.02587 10.8385 2 10.7072 2C10.5759 2 10.4458 2.02587 10.3245 2.07614C10.2031 2.12641 10.0929 2.20009 10 2.29297L2.29313 10.0005C2.19987 10.093 2.12593 10.2031 2.0756 10.3245C2.02528 10.4458 1.99959 10.576 2.00001 10.7073V13.5005C2.00001 13.7657 2.10536 14.02 2.2929 14.2076C2.48043 14.3951 2.73479 14.5005 3.00001 14.5005H5.79313C5.9245 14.5009 6.05464 14.4752 6.17599 14.4249C6.29735 14.3746 6.40748 14.3006 6.50001 14.2073L14.2069 6.50047C14.2998 6.40761 14.3734 6.29736 14.4237 6.17602C14.474 6.05468 14.4999 5.92463 14.4999 5.79329C14.4999 5.66195 14.474 5.53189 14.4237 5.41055C14.3734 5.28921 14.2998 5.17896 14.2069 5.0861ZM5.79313 13.5005H3.00001V10.7073L8.50001 5.20735L11.2931 8.00047L5.79313 13.5005ZM12 7.29297L9.20688 4.50047L10.7069 3.00047L13.5 5.79297L12 7.29297Z"
                    fill="#515ADA"
                  />
                </svg>
                {isAccountDetailEditable ? "Done" : "Edit"}
              </button>
            </div>

            <div className="m-8">
              <div className=" grid grid-cols-2 gap-4">
                <div className=" font-medium my-2">
                  Account Holder Name
                  <input
                    onChange={handleChange}
                    value={details["accountHolderName"]}
                    name="accountHolderName"
                    disabled={!isAccountDetailEditable}
                    type="text"
                    className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                    placeholder="Account Holder Name"
                  />
                </div>

                <div className=" font-medium my-2 ">
                  Bank Name
                  <input
                    onChange={handleChange}
                    value={details["bankName"]}
                    name="bankName"
                    disabled={!isAccountDetailEditable}
                    type="text"
                    className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                    placeholder="Bank Number"
                  />
                </div>

                <div className=" font-medium ">
                  Account Number
                  <input
                    onChange={handleChange}
                    value={details["accountNumber"]}
                    name="accoutnNumber"
                    disabled={!isAccountDetailEditable}
                    type="text"
                    className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                    placeholder="Account Number"
                  />
                </div>

                <div className=" font-medium ">
                  Confirm Account Number
                  <input
                    onChange={handleChange}
                    value={details["confirmAccount"]}
                    name="confirmAccount"
                    disabled={!isAccountDetailEditable}
                    type="text"
                    className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                    placeholder="Confirm Account Number"
                  />
                </div>

                <div className=" font-medium">
                  IFSC Code
                  <input
                    onChange={handleChange}
                    value={details["ifsc"]}
                    name="ifsc"
                    disabled={!isAccountDetailEditable}
                    type="text"
                    className="p-4 border border-[#646464] border-opacity-50 w-full rounded-lg my-2"
                    placeholder="IFSC Code"
                  />
                </div>
              </div>
            </div>

            <div className=" flex justify-between m-4">
              <h1 className=" font-semibold text-2xl">Images</h1>

              <button
                onClick={handleImageClick}
                className="border-2 border-[#515ADA] border-opacity-60 text-[#515ADA] px-2 py-1 flex items-center gap-2 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M14.2069 5.0861L11.4144 2.29297C11.3215 2.20009 11.2113 2.12641 11.0899 2.07614C10.9686 2.02587 10.8385 2 10.7072 2C10.5759 2 10.4458 2.02587 10.3245 2.07614C10.2031 2.12641 10.0929 2.20009 10 2.29297L2.29313 10.0005C2.19987 10.093 2.12593 10.2031 2.0756 10.3245C2.02528 10.4458 1.99959 10.576 2.00001 10.7073V13.5005C2.00001 13.7657 2.10536 14.02 2.2929 14.2076C2.48043 14.3951 2.73479 14.5005 3.00001 14.5005H5.79313C5.9245 14.5009 6.05464 14.4752 6.17599 14.4249C6.29735 14.3746 6.40748 14.3006 6.50001 14.2073L14.2069 6.50047C14.2998 6.40761 14.3734 6.29736 14.4237 6.17602C14.474 6.05468 14.4999 5.92463 14.4999 5.79329C14.4999 5.66195 14.474 5.53189 14.4237 5.41055C14.3734 5.28921 14.2998 5.17896 14.2069 5.0861ZM5.79313 13.5005H3.00001V10.7073L8.50001 5.20735L11.2931 8.00047L5.79313 13.5005ZM12 7.29297L9.20688 4.50047L10.7069 3.00047L13.5 5.79297L12 7.29297Z"
                    fill="#515ADA"
                  />
                </svg>
                {isImageEditable ? "Done" : "Edit"}
              </button>
            </div>
          </form>
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

export default Profile;
