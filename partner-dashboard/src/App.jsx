import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import OrderHistory from "./pages/OrderHistory";
import InProgressMeetup from "./pages/InProgressMeetup";
import UpcomingMeetup from "./pages/UpcomingMeetup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { socket } from "./components/Socket";
import { useSelector } from "react-redux";

const App = () => {
  const { currentPartner } = useSelector((state) => state.partner);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket");
      
    });

    socket.on("arrival", (data) => {
      console.log("Connected to socket");
      console.log(data); 
    });

    socket.on("process", (data) => {
      console.log("Connected to socket");
      console.log(data);  
    });

    socket.on("alert", (data) => { 
      console.log("Connected to socket");
      console.log(data);
    });
}, [socket, currentPartner]);

  return (
    <BrowserRouter basename="umla/partnerDashboard">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order_history" element={<OrderHistory />} />
        <Route path="/in_progress_meetup" element={<InProgressMeetup />} />
        <Route path="/upcoming_meetup" element={<UpcomingMeetup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
