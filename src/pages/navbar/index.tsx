import { Menu, X, Home, Info, PlusCircle, HistoryIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const menu = [
    { id: 1, label: "Home", path: "/", icon: <Home size={20} /> },
    { id: 2, label: "New chat", path: "/", icon: <PlusCircle size={20} /> },
    { id: 3, label: "About", path: "/about", icon: <Info size={20} /> },
    { id: 4, label: "History", path: "/", icon: <HistoryIcon size={20} /> },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const [isHoverCapable, setIsHoverCapable] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isPinned && isHoverCapable && window.innerWidth >= 768) {
      setIsCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned && isHoverCapable && window.innerWidth >= 768) {
      setIsCollapsed(true);
    }
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      closeMenu();
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverCapable(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsHoverCapable(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex relative w-full">
      <button
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
        className="fixed top-4 left-4 z-50 md:hidden bg-[#141414] text-white p-2 rounded-lg shadow-lg"
      >
        {!isMenuOpen && <Menu size={22} />}
      </button>

      <aside
        role="menu"
        className={`
          fixed top-0 left-0 h-full bg-[#141414] text-white shadow-lg z-40
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
          ${isCollapsed ? "md:w-16" : "md:w-56"}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center w-full gap-2">
            {!isCollapsed && <h2 className="text-lg font-bold">GoodOne</h2>}
            <button
              onClick={togglePin}
              aria-label="Pin menu"
              className={`hidden md:block text-white hover:text-gray-300 transition-colors ${
                isCollapsed ? "ml-0" : "ml-auto"
              }`}
            >
              <Menu
                size={18}
                className={`transition-transform duration-300 ${
                  isPinned ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>
          <button
            onClick={closeMenu}
            className="md:hidden text-white hover:text-gray-300"
          >
            <X size={22} />
          </button>
        </div>
        <ul className="flex flex-col gap-2 mt-4 px-2">
          {menu.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                role="menuitem"
                onClick={handleLinkClick}
                className={`
                  flex items-center gap-3 p-3 rounded-lg transition-colors group relative
                  ${
                    location.pathname === item.path
                      ? "bg-gray-800 text-blue-400"
                      : "hover:bg-[#2f2f2f]"
                  }
                  ${isCollapsed ? "justify-center md:justify-start" : ""}
                `}
                title={isCollapsed ? item.label : ""}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span
                  className={`
                    transition-all duration-300 whitespace-nowrap
                    ${
                      isCollapsed
                        ? "md:opacity-0 md:w-0 -translate-x-3 overflow-hidden"
                        : "opacity-100 translate-x-0"
                    }
                  `}
                >
                  {item.label}
                </span>
                {isCollapsed && isHoverCapable && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 hidden md:block">
                    {item.label}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}

      <main
        className={`flex-1 overflow-y-auto px-5 transition-all duration-300 bg-[#212121]
        ${isPinned ? (isCollapsed ? "md:ml-16" : "md:ml-56") : "ml-0"}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
