import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchingStart, fetchingSuccess } from "../redux/partnerSlice";
import { publicRequest } from "../utils/requestMethods";
import { useRef } from "react";
import { SpinnerGap } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { socket } from "../components/Socket";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const { currentPartner, isFetching, error } = useSelector(
    (state) => state.partner
  );
  const dispatch = useDispatch();
  // console.log(currentPartner.user);

  // To clear persisted error data in userSlice's initialState on refresh page.
  // useEffect(() => {
  //   dispatch(fetchingFailure(null));
  // }, [dispatch]);

  // fetching partner data on login
  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchPartner = async () => {
      dispatch(fetchingStart());

      try {
        const res = await publicRequest.post("/partner/login", {
          email: email.current.value,
          password: password.current.value,
        });
        dispatch(fetchingSuccess(res.data));
        // console.log(res.data);
      } catch (error) {
        // dispatch(fetchingFailure(error.response.data));
        console.log(error);
      }
    };

    fetchPartner();
  };

  // redirect to analytics page after login
  useEffect(() => {
    if (currentPartner) {
      socket.connect();
      navigate("/home");
    }
  }, [currentPartner]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket");
      socket.emit("signin", currentPartner?.user._id);
    });
  }, [socket, currentPartner]);

  return (
    <div className="flex py-20 justify-center gap-20 w-screen h-screen px-48 ">
      {/* left form container start */}
      <div className="w-2/5 my-20 ">
        <div className="flex items-center gap-6 my-10">
          <div className="w-[45px] h-[60px]">
            <img
              src="/umla-logo.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-2">
            <div>
              <img src="/umla.png" alt="umla" />
            </div>
            <span className="text-[20px] font-light text-[#5E5E5E] opacity-70 tracking-wider">
              Meetup Partners
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className=" my-16">
          <div className="flex flex-col mb-8">
            <label
              htmlFor="username"
              className="font-light text-lg tracking-widest my-2 text-black text-opacity-60"
            >
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              placeholder="Your Username"
              required
              autoComplete="off"
              ref={email}
              className="outline-none border-b border-[#C0C0C0] font-medium text-base px-2 tracking-wider py-3 text-black cursor-pointer my-2"
            />
          </div>

          <div className="flex flex-col mb-8 ">
            <label
              htmlFor="password"
              className="font-light text-lg tracking-widest my-2 text-black text-opacity-60"
            >
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              required
              ref={password}
              className="outline-none border-b border-[#C0C0C0] font-semibold tracking-wider text-base px-2 py-3 text-black cursor-pointer my-2"
            />
          </div>

          <label className="text-[16px] font-normal text-[#5E5E5E] text-opacity-70 flex items-center gap-2 mb-12">
            <input
              type="checkbox"
              className="text-[#5E5E5E] rounded-sm w-6 h-5 my-5"
            />
            Remember Me
          </label>

          <button
            type="submit"
            disabled={isFetching}
            className="bg-[#515ADA] text-white text-lg font-medium w-full rounded-xl p-4 my-10 flex items-center justify-center cursor-pointer"
          >
            {/* Login */}
            {isFetching ? (
              <span className="animate-spin">
                <SpinnerGap size={30} />
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-lg font-bold underline underline-offset-2 text-center">
          Need Help? Let's work together!
        </div>
      </div>
      {/* left form container end */}

      {/* right img container start */}
      <div
        style={{ backgroundImage: "url('/background-pattern.png')" }}
        className="flex  bg-[#515ADA] h-3/4 w-1/2 "
      >
        <div className=" w-full h-full flex items-center text-left justify-center text-white pl-5">
          <div className="text-white">
            <h3 className=" text-4xl font-normal tracking-wider ">
              WELCOME TO
            </h3>
            <h2 className=" font-bold text-4xl  mb-10 mt-8 tracking-wider">
              UMLA PARTNERS
            </h2>
            <span className="text-5xl font-medium tracking-wider">
              Login to Access Dashboard
            </span>
          </div>
        </div>
      </div>

      {/* right img container start */}
    </div>
  );
};

export default Login;
