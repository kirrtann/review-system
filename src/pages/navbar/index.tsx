import { Menu, X, Home, Info } from "lucide-react";
import { useState, useEffect, useMemo, type JSX } from "react";
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
      { id: 3, label: "About", path: "/about", icon: <Info size={20} /> },
    ],
    []
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const [isHoverCapable, setIsHoverCapable] = useState(false);

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

  const togglePin = () => {
    setIsPinned((prev) => {
      const pinned = !prev;
      setIsCollapsed(!pinned);
      return pinned;
    });
  };

  return (
    <div className="flex relative w-full min-h-screen">
      <button
        onClick={() => setIsMenuOpen((s) => !s)}
        aria-expanded={isMenuOpen}
        aria-controls="app-sidebar"
        className="fixed top-4 left-4 md:hidden text-white p-2.5 rounded-xl shadow-lg border border-white/10"
      >
        {!isMenuOpen && <Menu size={22} />}
      </button>

      <aside
        id="app-sidebar"
        role="navigation"
        className={[
          "fixed top-0 left-0 h-full z-40",
          "bg-[#141414] text-white border-r border-white/10 shadow-2xl",
          "transform transition-transform duration-300 ease-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          isCollapsed ? "md:w-16" : "md:w-64",
          "flex flex-col",
        ].join(" ")}
        onMouseEnter={() => {
          if (!isPinned && isHoverCapable && window.innerWidth >= 768) {
            setIsCollapsed(false);
          }
        }}
        onMouseLeave={() => {
          if (!isPinned && isHoverCapable && window.innerWidth >= 768) {
            setIsCollapsed(true);
          }
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold tracking-tight">Show-sage </h2>
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
            <Menu size={22} />
          </button>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="md:hidden text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 py-3">
          <ul className="flex flex-col gap-1 px-2">
            {menu.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={() =>
                    window.innerWidth < 768 && setIsMenuOpen(false)
                  }
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 p-2.5 rounded-lg relative group",
                      "transition-colors duration-200 focus:outline-none ",
                      isActive
                        ? "bg-blue-500 text-white border border-blue-500/20"
                        : "hover:bg-white/10 text-gray-300 border border-transparent",
                      isCollapsed ? "justify-center md:justify-start" : "",
                    ].join(" ")
                  }
                  title={isCollapsed ? item.label : ""}
                  end
                >
                  <span>{item.icon}</span>
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
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
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
          "flex-1 transition-all duration-300 ease-out",
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
