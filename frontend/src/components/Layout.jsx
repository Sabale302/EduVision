import { Outlet, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import AppBar from "./AppBar";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Hide Sidebar and AppBar on login/signup
  const hideLayout = path === "/login" || path === "/signup";

  // Chatbot script management
  useEffect(() => {
    if (!hideLayout) {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.setAttribute("chatbotId", "RA1DCg3ReDnD-ED0rjpU-");
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [hideLayout]);

  return (
    <div className="flex h-screen">
      <CssBaseline />
      {!hideLayout && <Sidebar />}
      <div className="flex flex-col flex-grow bg-gray-100">
        {!hideLayout && <AppBar />}

        <div
          style={{
            marginLeft: hideLayout ? "0px" : "250px",
            width: hideLayout ? "100%" : "calc(100% - 250px)",
            overflowY: "auto",
            flexGrow: 1,
          }}
          className={hideLayout ? "flex justify-center items-center h-screen bg-gray-100" : "p-4"}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;