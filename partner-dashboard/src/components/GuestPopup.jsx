import { X } from "@phosphor-icons/react";

const GuestPopup = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center gap-3 bg-white rounded-[32px] py-[33px] px-[22px]">
        <div className="w-full flex justify-end -mt-3 ">
          <button className="z-10">
            <X size={28} fill="black" />
          </button>
        </div>

        <div className="flex items-center gap-2 -mt-10 w-full">
          <div className="w-[93px] h-[93px]">
            <img
              src="/celebrate.png"
              alt="celebrate"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center  ml-7">
            <span className="font-medium text-[22px]">
              Guests Have Arrived !
            </span>
            <span className="text-[#646464] font-medium text-sm">
              It’s time to Process their order
            </span>
          </div>
        </div>

        <div className="border w-[445px] h-[235px] rounded-2xl p-4 bg-gradient-to-r from-indigo-700 to-indigo-300">
          <h2 className="border-b mb-3 pb-2  text-center text-xl font-semibold text-white">
            Table-21
          </h2>

          <div className="flex flex-col gap-2">
            {[1, 2].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-[82px] h-[68px] rounded-xl">
                    <img
                      src="/coffee.png"
                      alt="food"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col ">
                    <span className="text-[18px] font-medium text-white">
                      Cappuccino
                    </span>
                    <span className="text-xs font-normal text-white">
                      Topped wth crunchy choco chips
                    </span>
                  </div>
                </div>

                <div className="text-[#252525] font-semibold text-sm">X1</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPopup;
