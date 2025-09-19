import { Menu, X, Home, Info, PlusCircle, History } from "lucide-react";
import { useState, useEffect, useMemo, useCallback, type JSX } from "react";
import { NavLink, Outlet } from "react-router-dom";

type MenuItem = {
  id: number;
  label: string;
  path: string;
  icon: JSX.Element;
};

const Navbar = () => {
  const menu: MenuItem[] = useMemo(
    () => [
      { id: 1, label: "Home", path: "/", icon: <Home size={20} /> },
      {
        id: 2,
        label: "New Chat",
        path: "/chat",
        icon: <PlusCircle size={20} />,
      },
      { id: 3, label: "About", path: "/about", icon: <Info size={20} /> },
      {
        id: 4,
        label: "History",
        path: "/history",
        icon: <History size={20} />,
      },
    ],
    []
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const [isHoverCapable, setIsHoverCapable] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((s) => !s), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const togglePin = useCallback(() => {
    setIsPinned((prev) => {
      const pinned = !prev;
      setIsCollapsed(!pinned);
      return pinned;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isPinned && isHoverCapable && window.innerWidth >= 768) {
      setIsCollapsed(false);
    }
  }, [isPinned, isHoverCapable]);

  const handleMouseLeave = useCallback(() => {
    if (!isPinned && isHoverCapable && window.innerWidth >= 768) {
      setIsCollapsed(true);
    }
  }, [isPinned, isHoverCapable]);

  const handleLinkClick = useCallback(() => {
    if (window.innerWidth < 768) closeMenu();
  }, [closeMenu]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) closeMenu();
    },
    [isMenuOpen, closeMenu]
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverCapable(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsHoverCapable(e.matches);
    mq.addEventListener("change", onChange);

    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="flex relative w-full min-h-screen">
      <button
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-controls="app-sidebar"
        className="fixed top-4 left-4  md:hidden  text-white p-2.5 rounded-xl shadow-lg border border-white/10"
      >
        {!isMenuOpen && <Menu size={22} />}
      </button>

      <aside
        id="app-sidebar"
        role="navigation"
        aria-label="Main navigation"
        onKeyDown={handleKeyDown}
        className={[
          "fixed top-0 left-0 h-full z-40",
          "bg-gradient-to-b from-[#141414] to-[#0e0e0e] text-white",
          "border-r border-white/10 shadow-2xl",
          "transform transition-transform duration-300 ease-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          isCollapsed ? "md:w-16" : "md:w-64",
          "flex flex-col",
        ].join(" ")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center w-full gap-2">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight">
                  GoodOne
                </h2>
              </div>
            )}
            <button
              onClick={togglePin}
              aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
              className={[
                "hidden md:flex items-center justify-center w-8 h-8 rounded-lg",
                "text-gray-300 hover:text-white hover:bg-white/10 transition-colors",
                isCollapsed ? "ml-0" : "ml-auto",
              ].join(" ")}
            >
              {<Menu size={22} />}
            </button>
          </div>
          <button
            onClick={closeMenu}
            className="md:hidden text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          <ul className="flex flex-col gap-1 px-2" role="menubar">
            {menu.map((item) => (
              <li key={item.id} role="none">
                <NavLink
                  to={item.path}
                  role="menuitem"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 p-2.5 rounded-lg relative group",
                      "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40",
                      isActive
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                        : "hover:bg-white/10 text-gray-300 border border-transparent",
                      isCollapsed ? "justify-center md:justify-start" : "",
                    ].join(" ")
                  }
                  title={isCollapsed ? item.label : ""}
                  end
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span
                    className={[
                      "transition-all duration-300 whitespace-nowrap",
                      isCollapsed
                        ? "md:opacity-0 md:w-0 md:overflow-hidden"
                        : "opacity-100",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>

                  {isCollapsed && isHoverCapable && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden md:block pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="px-2.5 py-1.5 text-sm rounded-md bg-black text-white border border-white/10 shadow-xl whitespace-nowrap">
                        {item.label}
                      </div>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main
        className={[
          "flex-1 min-h-screen overflow-y-auto transition-all duration-300 ease-out",
          "bg-gradient-to-br from-[#212121] to-[#1a1a1a]",
          isPinned ? (isCollapsed ? "md:ml-16" : "md:ml-64") : "md:ml-0",
        ].join(" ")}
      >
        <div className="max-w-[777px] lg:mx-auto sm:mx-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Navbar;
