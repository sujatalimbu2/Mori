import { useEffect, useState } from "react";
import { Flame, Star, Sprout } from "lucide-react";
import { NavLink } from "react-router-dom";
import AvatarIcon from "./AvatarIcon";

function Navbar({ xp, streak }) {
  const [avatar, setAvatar] = useState(() => {
    const saved = localStorage.getItem("mori-profile");

    if (!saved) return "sprout";

    const profile = JSON.parse(saved);

    return profile.avatar || "sprout";
  });

  useEffect(() => {
    const updateAvatar = () => {
      const saved = localStorage.getItem("mori-profile");

      if (!saved) {
        setAvatar("sprout");
        return;
      }

      const profile = JSON.parse(saved);

      setAvatar(profile.avatar || "sprout");
    };

    window.addEventListener(
      "mori-profile-updated",
      updateAvatar
    );

    return () => {
      window.removeEventListener(
        "mori-profile-updated",
        updateAvatar
      );
    };
  }, []);

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
          <span>{streak}</span>
        </div>

        <div className="stat">
          <Star size={18} />
          <span>{xp}</span>
        </div>

        <NavLink
          to="/profile"
          className="profile"
          aria-label="Open profile"
        >
          <AvatarIcon
            type={avatar}
            size={28}
          />
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;