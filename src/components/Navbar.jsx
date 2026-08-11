import { Flame, Star, Sprout } from "lucide-react";

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
        <a className="active">Garden</a>
        <a>Habits</a>
        <a>Journal</a>
        <a>World</a>
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