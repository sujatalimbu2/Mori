import { Flame, Star, Sprout } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar({ xp }) {
  return (
    <header className="navbar">
      <div className="logo">
        <div className="logo-icon">
          <Sprout size={22} />
        </div>

        <span>Mori</span>
      </div>

      <nav>
        <NavLink to="/">Garden</NavLink>

        <NavLink to="/habits">Habits</NavLink>

        <NavLink to="/journal">Journal</NavLink>

        <NavLink to="/world">World</NavLink>
      </nav>

      <div className="nav-stats">
        <div className="stat">
          <Flame size={18} />
          <span>7</span>
        </div>

        <div className="stat">
          <Star size={18} />
          <span>{xp}</span>
        </div>

        <div className="profile">S</div>
      </div>
    </header>
  );
}

export default Navbar;
