function StreakCard({ streak }) {
  return (
    <div className="progress-card">
      <div className="card-icon">🔥</div>

      <div>
        <p>Growing streak</p>
        <h3>{streak} days</h3>
        <span>Keep going!</span>
      </div>
    </div>
  );
}

export default StreakCard;