import "../CSS/XPBar.css";
function XPBar({ xp, level }) {
  const maxXP = 300;
  const progress = Math.min((xp / maxXP) * 100, 100);

  return (
    <div className="progress-card xp-card">
      <div className="card-icon">🌱</div>

      <div className="xp-info">
        <p>Garden level</p>

        <h3>Level {level}</h3>

        <div className="xp-bar">
          <div
            className="xp-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span>
          {xp} / {maxXP} XP
        </span>
      </div>
    </div>
  );
}

export default XPBar;