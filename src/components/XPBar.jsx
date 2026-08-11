function XPBar({ xp, level }) {
  return (
    <div className="progress-card">
      <div className="card-icon">🌱</div>

      <div>
        <p>Garden level</p>
        <h3>Level {level}</h3>
        <span>{xp} / 300 XP</span>
      </div>
    </div>
  );
}

export default XPBar;