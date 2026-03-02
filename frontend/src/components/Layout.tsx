import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
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
