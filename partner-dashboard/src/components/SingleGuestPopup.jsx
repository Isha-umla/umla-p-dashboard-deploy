import { X } from "@phosphor-icons/react";

const SingleGuestPopup = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-[32px] py-[33px] px-[22px] w-[445px] h-[235px]">
        <div className="w-full flex justify-end ">
          <button className="z-10">
            <X size={28} fill="black" />
          </button>
        </div>

        <div className="flex items-center gap-2 -mt-5 w-full">
          <div className="w-[93px] h-[93px]">
            <img
              src="/celebrate.png"
              alt="celebrate"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center  ml-7">
            <span className="font-medium text-[22px]">
              <span className="text-[#515ada]">Harry</span> Have Arrived !
            </span>
            <span className="text-[#646464] font-medium text-sm">
              It’s time to Process their order
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGuestPopup;
