import DailyGoals from "../components/DailyGoals";
import "../App.css";
import "../CSS/HabitsPage.css";

function HabitsPage({ goals, onToggle, onAddGoal }) {
  const completedGoals = goals.filter((goal) => goal.completed).length;

  return (
    <section className="habits-page">
      <div className="habits-header">
        <p className="section-label">YOUR ROUTINE</p>

        <h1>Little habits 🌱</h1>

        <p>Small actions today help your garden grow tomorrow.</p>
      </div>

      <div className="habits-progress">
        <span>
          {completedGoals} of {goals.length} completed
        </span>

        <span>
          {completedGoals === goals.length
            ? "Garden is growing! 🌿"
            : "Keep going! 💚"}
        </span>
      </div>

      <DailyGoals goals={goals} onToggle={onToggle} onAddGoal={onAddGoal} />
    </section>
  );
}

export default HabitsPage;
