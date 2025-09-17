import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import Navbar from "../pages/navbar";
import Contact from "../pages/contact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

const Layout = () => {
  return (
    <div className="bg-[#181818] w-full font-serif text-white flex">
      <Navbar />
    </div>
  );
};

export default AppRoutes;
