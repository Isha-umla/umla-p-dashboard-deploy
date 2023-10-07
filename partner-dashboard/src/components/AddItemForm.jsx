import { X } from "@phosphor-icons/react";
import React, { useState } from "react";

const AddItemForm = ({ setShowAddForm, addMenuItem }) => {
  const [details, setDetails] = useState({});
  const [isBest, setIsBest] = useState(false);
  const [picture, setPicture] = useState({
    images: [],
  });
  const [imagePreview, setImagePreview] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  console.log(details);

  // handle form submit

  // const handleSubmit = (e) => {
  //   e.preventDefault;
  // };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
    setDetails({ ...details, category, isBest });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    if (!file) return; // No file selected, do nothing

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    if (allowedTypes.includes(file.type) && file.size <= maxFileSize) {
      // Valid image file
      const preview = URL.createObjectURL(file);

      setImagePreview(preview); // Update the preview
      setPicture(file); // Store the selected image
    } else {
      // Invalid file type or size
      alert("Please select a valid image (JPEG, PNG, GIF) within 5MB.");
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(""); // Clear the image preview
    setPicture(null); // Clear the selected image
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    const selectedImages = Array.from(files).filter(
      (file) => allowedTypes.includes(file.type) && file.size <= maxFileSize
    );

    const previews = selectedImages.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);

    setPicture({ ...picture, images: selectedImages });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          addMenuItem(e, details);
          setShowAddForm(false);
        }}
        className=" m-4 rounded-3xl max-w-xl mx-auto"
      >
        <div className="flex relative justify-between ">
          <h1 className="text-3xl m-2 my-4">Add Item</h1>
          <button
            className=" absolute top-2 right-3 p-2 cursor-pointer"
            onClick={() => {
              setShowAddForm(false);
            }}
          >
            <X size={25} />
          </button>
        </div>

        <div className="m-2">
          <div className="flex ">
            <div className="w-3/5 pr-2 my-2">
              <label className="font-medium text-[#646464]">Item Name</label>
              <input
                onChange={handleChange}
                // value={details["itemName"]}
                type="text"
                name="name"
                className="p-3 border border-[#646464] border-opacity-50 rounded-lg w-full my-2"
              />
            </div>

            <div className="w-2/5 pl-2 my-2">
              <label className=" font-medium text-[#646464] ">Item Price</label>
              <div className="flex items-center">
                <span className="p-3 border border-[#646464] border-opacity-50 rounded-l-lg">
                  ₹
                </span>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  className="p-3 border border-[#646464] border-opacity-50 rounded-r-lg w-full my-2"
                />
              </div>
            </div>
          </div>

          <div className="my-2 text-[#646464] font-medium">
            Item Description
            <textarea
              onChange={handleChange}
              // value={details["itemDescription"]}
              name="description"
              className="p-4 border border-[#646464] border-opacity-50 rounded-lg w-full my-2 text-black"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 my-2 font-medium">
            <div className="text-[#646464] ">
              Item Classification
              <select
                name="classification"
                onChange={handleChange}
                className="p-3 border border-[#646464] border-opacity-50 rounded-lg w-full my-2 h-12 text-black "
              >
                <option> Select Classification </option>
                <option value="alcohol"> Alcohol</option>
                <option value="beverage"> Beverage</option>
                <option value="chinese"> Chinese</option>
                <option value="continental"> Continental</option>
                <option value="italian"> Italian</option>
                <option value="lebanese"> Lebanese</option>
                <option value="northIndian"> North Indian</option>
                <option value="southIndian"> South Indian</option>
                <option value="starter"> Starter</option>
              </select>
            </div>

            <div className="text-[#646464] ">
              Item Category
              <div className="grid grid-cols-2 gap-4 my-2">
                <button
                  className={`rounded-full border border-[#646464] border-opacity-50 flex items-center justify-center h-12 ${
                    selectedCategory === "veg" ? "bg-[#EFD5FF]" : ""
                  }`}
                  onClick={(e) => handleCategorySelect(e, "veg")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M15.25 1H3.25C2.14543 1 1.25 1.89543 1.25 3V15C1.25 16.1046 2.14543 17 3.25 17H15.25C16.3546 17 17.25 16.1046 17.25 15V3C17.25 1.89543 16.3546 1 15.25 1Z"
                      stroke="#008200"
                      strokeWidth="0.741"
                    />
                    <path
                      d="M9.25001 13.8809C11.9459 13.8809 14.1314 11.6954 14.1314 8.99952C14.1314 6.30362 11.9459 4.11816 9.25001 4.11816C6.55411 4.11816 4.36865 6.30362 4.36865 8.99952C4.36865 11.6954 6.55411 13.8809 9.25001 13.8809Z"
                      fill="#008200"
                    />
                  </svg>
                  <span className="mx-2 text-sm text-black font-semibold">
                    Veg
                  </span>
                </button>
                <button
                  className={`rounded-full border border-[#646464] border-opacity-50 flex items-center justify-center h-12 ${
                    selectedCategory === "non-veg" ? "bg-[#EFD5FF]" : ""
                  }`}
                  onClick={(e) => handleCategorySelect(e, "non-veg")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M15.25 1H3.25C2.14543 1 1.25 1.89543 1.25 3V15C1.25 16.1046 2.14543 17 3.25 17H15.25C16.3546 17 17.25 16.1046 17.25 15V3C17.25 1.89543 16.3546 1 15.25 1Z"
                      stroke="#964122"
                      strokeWidth="0.741"
                    />
                    <path
                      d="M9.25001 13.8809C11.9459 13.8809 14.1314 11.6954 14.1314 8.99952C14.1314 6.30362 11.9459 4.11816 9.25001 4.11816C6.55411 4.11816 4.36865 6.30362 4.36865 8.99952C4.36865 11.6954 6.55411 13.8809 9.25001 13.8809Z"
                      fill="#964122"
                    />
                  </svg>
                  <span className="mx-2 text-sm text-black font-semibold">
                    Non-Veg
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className=" gap-3 my-4 font-medium inline-flex">
            <label className="text-[#515ADA] text-lg flex items-center justify-center gap-2 ">
              <input
                type="checkbox"
                name="isBest"
                onClick={(e) => setIsBest(!isBest)}
                className="w-5 h-5 my-1"
              />
              Best Seller
            </label>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className=" my-4 text-[#646464] font-medium"
          >
            Upload Item Images
            <div className=" rounded-lg border-4 border-dashed p-6 my-4">
              {!imagePreview ? (
                <label
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  htmlFor="imageInput"
                  className="w-full text-center flex flex-col items-center justify-center m-2 cursor-pointer"
                >
                  <input
                    type="file"
                    id="imageInput"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/jpeg, image/png, image/gif"
                  />
                  <span className="text-[#2E65F3] mx-1 font-semibold">
                    Upload a file
                  </span>
                  or drag and drop
                  <p className="text-[#646464] text-sm">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </label>
              ) : (
                <div className="w-full text-center flex flex-col items-center justify-center m-2">
                  <img
                    src={imagePreview}
                    alt=""
                    className="max-w-full max-h-32 object-contain rounded-lg"
                  />

                  <button
                    className="mt-2 p-1 bg-white rounded-full font-bold"
                    onClick={handleRemoveImage}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#515ADA] w-full text-white p-3 rounded-lg"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
