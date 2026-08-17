import "../CSS/XPBar.css";

function XPBar({ xp, level }) {
  const milestones = [0, 100, 200, 300, 500, 750];

  const currentLevelXP = milestones[level - 1] ?? 0;
  const nextLevelXP = milestones[level] ?? currentLevelXP + 100;

  const progressXP = xp - currentLevelXP;
  const requiredXP = nextLevelXP - currentLevelXP;

  const progress = Math.min(Math.max((progressXP / requiredXP) * 100, 0), 100);

  return (
    <div className="progress-card xp-card">
      <div className="card-icon">🌱</div>

      <div className="xp-info">
        <p>Garden level</p>

        <h3>Level {level}</h3>

        <div className="xp-bar">
          <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <span>
          {progressXP} / {requiredXP} XP
        </span>
      </div>
    </div>
  );
}

export default XPBar;
