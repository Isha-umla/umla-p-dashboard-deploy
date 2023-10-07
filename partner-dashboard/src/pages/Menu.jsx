import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import AddItemForm from "../components/AddItemForm.jsx";
import { publicRequest } from "../utils/requestMethods.js";
import { useDispatch, useSelector } from "react-redux";
import EditItemForm from "../components/EditItemForm.jsx";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert.jsx";
import GuestPopup from "../components/GuestPopup.jsx";
import SingleGuestPopup from "../components/SingleGuestPopup.jsx";
import {
  addMenuItems,
  menuItemsFetchingSuccess,
  removeMenuItems,
  updateMenuItems,
} from "../redux/menuItemsSlice.js";

import {
  CaretRight,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Trash,
} from "@phosphor-icons/react";

const leftListArry = [
  "All Items",
  "North Indians",
  "South Indians",
  "Chinese",
  "Italian",
  "Continental",
  "Lebanese",
  "Alcohol",
  "Beverage",
  "Starter",
];

const rightListArry = ["All", "Veg", "Non-Veg"];

const Menu = ({ showPopupBox, singleGuestPopupBox, alertBox }) => {
  const [leftListSelected, setLeftListSelected] = useState(0);
  const [rightSelected, setRightSelected] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [slide, setSlide] = useState(0);
  const [toggleBtnStatus, setToggleBtnStatus] = useState("active");

  console.log(toggleBtnStatus);

  // getting single menu item ID to update
  const [singleMenuItemID, setSingleMenuItemID] = useState("");

  // console.log(singleMenuItemID);

  const { currentPartner } = useSelector((state) => state.partner);

  const token = currentPartner?.token;

  const dispatch = useDispatch();
  const { menuItems } = useSelector((state) => state.menuItems);

  console.log(menuItems);

  //navigate to login page
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentPartner) {
      navigate("/");
    }
  }, [currentPartner]);

  // console.log(menuItems);

  // fetching menu items data and storing it into menuItemsSlice
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await publicRequest.get("/dashboard/getMenuItems", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(menuItemsFetchingSuccess(res.data.items));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenuItems();
  }, [token]);

  // add menu item
  const addMenuItem = async (e, menuDataObject) => {
    e.preventDefault();

    try {
      const res = await publicRequest.post(
        "/dashboard/addMenuItem",
        menuDataObject,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(addMenuItems(res.data));
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // edit or update menu item
  const editMenuItem = async (e, menuDataObject) => {
    e.preventDefault();

    try {
      const res = await publicRequest.put(
        "/dashboard/updateMenuItem",
        menuDataObject,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updateMenuItems(res.data));
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // delete menu item
  const deleteMenuItem = async (menuItemId) => {
    try {
      await publicRequest.delete(`/dashboard/deleteMenuItem/${menuItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(removeMenuItems(menuItemId));
    } catch (error) {
      console.log(error);
    }
  };

  // handle horizontal sliding
  const handleSlide = (direction) => {
    if (direction === "right") {
      setSlide((slide + 1) % leftListArry.length);
    }
  };

  //------ updating menu item toggle button status ---------
  const [menuItemBtnStatus, setMenuItemBtnStatus] = useState(true);

  const updateMenuItemBtnStatus = async (e) => {
    setMenuItemBtnStatus(e);
    try {
      const res = await publicRequest.put(
        "/dashboard/updateItemStatus",
        {
          status: !menuItemBtnStatus ? "active" : "inactive",
          itemId: singleMenuItemID,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data, "Hello response");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex ">
      <Sidebar />

      <div className="w-full">
        <Navbar />

        <div className=" px-16 py-4">
          {/* search and add items container start */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px] border border-[#515ADA] rounded-xl p-[10px] ">
              <MagnifyingGlass size={20} />
              <input
                type="text"
                placeholder="Search Items"
                className="text-base font-normal text-[#252525] outline-none"
              />
            </div>

            <div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-[10px] border border-[#515ADA] rounded-xl p-[10px] text-[#515ADA] cursor-pointer"
              >
                <Plus size={20} />
                Add Items
              </button>
            </div>
          </div>
          {/* search and add items container end */}

          {/* sliding list container start  */}
          <div className="flex items-center justify-between gap-3 my-5">
            {/* left side horizontal list start */}
            <div className="flex items-center gap-3 p-2 border-b-2 cursor-pointer">
              <ul className="flex items-center gap-5  w-[542px] overflow-hidden">
                {leftListArry.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setLeftListSelected(index)}
                    style={{
                      transform: `translateX(-${slide * 140}px )`,
                    }}
                    className={`text-[#646464] text-base font-medium  ${
                      leftListSelected === index &&
                      "underline decoration-[3px] underline-offset-8 !text-[#515ADA]"
                    }  min-w-[120px]  transition-all  text-center`}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSlide("right")}
                className="border cursor-pointer p-1 border-none outline-none"
              >
                <CaretRight size={20} />
              </button>
            </div>
            {/* left side horizontal list end */}

            {/* right side horizontal list start */}
            <div className="flex items-center justify-between gap-3  my-5 p-2 border-b-2">
              <ul className="flex items-center gap-8">
                {rightListArry.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setRightSelected(index)}
                    className={`text-[#646464] text-base font-medium  ${
                      rightSelected === index &&
                      "underline decoration-[3px] underline-offset-8 !text-[#515ADA]"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* right side horizontal list end */}
          </div>
          {/* sliding list container end  */}

          {/* main table container start */}
          <div className="border rounded-[40px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] bg-white p-5 my-[10px] mx-5">
            <table className="w-full">
              <thead className="border-b-2">
                <tr className="text-[#646464] font-medium text-base">
                  <th className="pb-2">Item Name</th>
                  <th className="pb-2">Item Description</th>
                  <th className="pb-2">Item Price</th>
                  <th className="pb-2">Item Status</th>
                  <th className="pb-2">Item Actions</th>
                </tr>
              </thead>

              <tbody>
                {menuItems.map((item, index) => (
                  <tr
                    onClick={() => setSingleMenuItemID(item?._id)}
                    key={index}
                    className="border-b-[1px] last:border-none"
                  >
                    <td className="text-sm text-[#252525] font-medium text-center py-5">
                      {item.name}
                    </td>

                    <td className="text-xs font-normal text-[#252525] text-center">
                      {item.bio}
                    </td>

                    <td className=" text-base font-medium text-center">
                      &#8377; {item.price}
                    </td>

                    <td className="text-center">
                      <div className="flex items-center justify-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              menuItemBtnStatus && item._id === singleMenuItemID
                            }
                            onChange={(e) => {
                              updateMenuItemBtnStatus(e.target.checked);
                            }}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-black dark:peer-focus:ring-black rounded-full peer dark:bg-red-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500`}
                          ></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                        </label>
                        {item.status}
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center justify-center gap-[10px]">
                        <button onClick={() => deleteMenuItem(item._id)}>
                          <Trash size={20} />
                        </button>

                        <button
                          onClick={() => setShowEditForm(true)}
                          className="flex items-center justify-center gap-[10px] outline-none rounded-lg border py-1 px-2 text-[#515ada] font-medium text-sm"
                        >
                          <PencilSimple size={15} /> Edit
                        </button>
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

      {/* middle screen popup Add Items Form start */}
      {showAddForm && (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/40">
          <div className="flex flex-col items-center gap-3 bg-white rounded-[32px] py-[33px] px-[22px]">
            <div className="w-full flex justify-end -mt-3 ">
              <AddItemForm
                setShowAddForm={setShowAddForm}
                addMenuItem={addMenuItem}
              />
            </div>
          </div>
        </div>
      )}
      {/* middle screen popup Add Items Form end */}

      {/* middle screen popup Edit Item Form start */}
      {showEditForm && (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/40">
          <div className="flex flex-col items-center gap-3 bg-white rounded-[32px] py-[33px] px-[22px]">
            <div className="w-full flex justify-end -mt-3 ">
              <EditItemForm
                setShowEditForm={setShowEditForm}
                editMenuItem={editMenuItem}
                singleMenuItemID={singleMenuItemID}
              />
            </div>
          </div>
        </div>
      )}
      {/* middle screen popup Edit Item Form end */}

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

export default Menu;
