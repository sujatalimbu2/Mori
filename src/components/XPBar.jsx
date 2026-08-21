import "../CSS/XPBar.css";

function XPBar({ xp, level }) {
  const milestones = [0, 100, 200, 300, 500, 750];

  const currentLevelXP = milestones[level - 1] ?? 0;
  const nextLevelXP = milestones[level];

  const isMaxLevel = level >= milestones.length;

  const progressXP = Math.max(xp - currentLevelXP, 0);

  const requiredXP = isMaxLevel
    ? 0
    : nextLevelXP - currentLevelXP;

  const progress = isMaxLevel
    ? 100
    : Math.min(
        Math.max((progressXP / requiredXP) * 100, 0),
        100
      );

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
          {isMaxLevel
            ? `${xp} XP — Garden fully grown 🌳`
            : `${progressXP} / ${requiredXP} XP`}
        </span>
      </div>
    </div>
  );
}

export default XPBar;
