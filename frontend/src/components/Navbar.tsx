import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__logo">⚽</span>
          <span className="navbar__title">
            World Cup <strong>2026</strong>
          </span>
        </NavLink>

        <ul className="navbar__links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/matches"
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              Matchs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/groups"
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              Groupes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              Équipes
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
