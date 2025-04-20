import { Outlet, useLocation } from "react-router-dom";
import { CssBaseline, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import AppBar from "./AppBar";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const hideSidebar = path === "/login" || path === "/signup";

  // Chatbot script management
  useEffect(() => {
    if (!hideSidebar) {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.setAttribute("chatbotId", "RA1DCg3ReDnD-ED0rjpU-");
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [hideSidebar]);

  return (
    <div>
      <CssBaseline />
      {!hideSidebar && <Sidebar />}
      <div className="flex flex-col flex-grow bg-gray-100">
        {!hideSidebar && (
          <>
            <AppBar />
            <Toolbar />
          </>
        )}

        <div
          style={{
            marginLeft: hideSidebar ? "0px" : "250px",
            width: hideSidebar ? "100%" : "calc(100% - 250px)"
          }}
          className={hideSidebar ? "flex justify-center items-center h-screen w-full bg-gray-100" : "p-4"}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
