import "../CSS/StreakCard.css";

function StreakCard({ streak }) {
  return (
    <div className="progress-card streak-card">
      <div className="card-icon">🔥</div>

      <div>
        <p>Growing streak</p>

        <h3>{streak} days</h3>

        <span className="streak-message">
          {streak >= 7
            ? "Amazing consistency! 🌿"
            : streak >= 3
            ? "Keep growing! 🌱"
            : "Start your streak! 🌱"}
        </span>
      </div>
    </div>
  );
}

export default StreakCard;