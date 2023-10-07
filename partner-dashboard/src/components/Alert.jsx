import { Link } from "react-router-dom";

const Alert = () => {
  return (
    <div className="absolute top-0 left-0 z-20 w-screen h-screen flex items-center justify-center bg-[#EC4040]">
      <div className="flex flex-col items-center rounded-[32px] py-[33px] px-[22px]">
        <div className="w-[154px] h-[136px] border-spacing-5">
          <img
            src="/warning.png"
            alt="warning"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-center text-white my-10">
          <span className="text-2xl font-medium">Table 5</span>
          <span className="text-[36px] font-bold">Is in Trouble</span>
        </div>

        <div className="flex flex-col items-center justify-center text-[36px] text-center font-medium text-white">
          <span>Can you lend a hand and help out on behalf of UMLA ? </span>
          <span>Thank you!</span>
        </div>

        <div className="flex items-center justify-center text-white mt-60">
          <button className="outline-none px-1 text-base font-medium cursor-pointer">
            <Link
              to={"/home"}
              className="hover:underline decoration-2 hover:underline-offset-2"
            >
              tap to continue
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
