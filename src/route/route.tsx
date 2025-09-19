import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import Navbar from "../pages/navbar";
import NewChat from "../pages/newchat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="newchat" element={<NewChat />} />
      </Route>
    </Routes>
  );
};

const Layout = () => {
  return (
    <div className="bg-[#181818] w-full font-sans text-white flex">
      <Navbar />
    </div>
  );
};

export default AppRoutes;
