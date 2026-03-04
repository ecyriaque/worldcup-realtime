import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { useMatchEventNotifications } from "../hooks/useMatchEventNotifications";
import "./Layout.css";
import "./Toast.css";

const Layout = () => {
  useMatchEventNotifications();

  return (
    <div className="layout">
      {/* Toaster pour les notifications */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Navbar />
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        <div className="container">
          <p>⚽ World Cup 2026 — Suivi en temps réel</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
