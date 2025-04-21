import { Outlet, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import AppBar from "./AppBar";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const hideLayout = path === "/login" || path === "/signup";

  useEffect(() => {
    if (!hideLayout) {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.setAttribute("chatbotId", "RA1DCg3ReDnD-ED0rjpU-");
      script.defer = true;
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }
  }, [hideLayout]);

  return (
    <div className="flex h-screen overflow-hidden">
      <CssBaseline />
      {!hideLayout && <Sidebar />}

      <div className="flex flex-col flex-grow bg-gray-100">
        {!hideLayout && <AppBar />}

        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            hideLayout ? "ml-0 w-full" : "ml-[250px]"
          } p-6`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
