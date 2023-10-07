import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ setToggleView, toggleView }) => {
  const location = useLocation().pathname.split("/")[1];

  let navHeading = "";

  switch (location) {
    case "in_progress_meetup":
      navHeading = "In Progress Meetup";
      break;
    case "upcoming_meetup":
      navHeading = "Upcoming Meetup";
      break;
    case "home":
      navHeading = "Home";
      break;
    case "order_history":
      navHeading = "Order History";
      break;
    case "profile":
      navHeading = "Profile";
      break;

    default:
      navHeading = location;
  }

  // partner name
  const partnerName = useSelector(
    (state) => state.partner.currentPartner?.user.name
  );

  return (
    <header className=" flex items-center justify-between gap-3 px-8 py-5">
      <h1 className="text-2xl font-semibold text-[#252525] capitalize">
        {navHeading}
      </h1>

      {/* toggle view container for Upcoming Meetups page start*/}

      {location === "upcoming_meetup" && (
        <div className="flex items-center justify-center gap-5">
          <button className="text-[#515ADA] text-base font-medium outline-none border-none">
            Toggle View
          </button>

          <button
            onClick={() => setToggleView(true)}
            className="p-1 cursor-pointer outline-none border-none"
          >
            <img
              src="/calendar.png"
              alt="calendar"
              className="w-[24px] h-[24px]"
            />
          </button>

          <button
            onClick={() => setToggleView(false)}
            className="bg-[#515ADA] p-1 rounded-lg outline-none border-none"
          >
            <img src="/clipboardText.png" alt="clipboard" />
          </button>
        </div>
      )}

      {/* toggle view container for Upcoming Meetups page end*/}

      <nav className="flex items-center justify-center gap-5 ">
        {/* <div>
          <Link to={"#"}>
            <Bell size={20} />
          </Link>
        </div> */}

        <div>
          <Link
            to={"#"}
            className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full"
          >
            <img
              src="/dp.jpg"
              alt="user"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>

        <div>
          <Link to={"#"} className="text-2xl font-semibold text-[#515ADA]">
            <span className="text-[#252525] mr-1">Hello,</span>
            {partnerName}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
