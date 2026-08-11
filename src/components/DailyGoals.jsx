import { Plus } from "lucide-react";
import HabitCard from "./HabitCard";

function DailyGoals({ goals, onToggle }) {
  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  return (
    <section className="goals-section">
      <div className="section-heading">
        <div>
          <p className="section-label">TODAY</p>
          <h2>Little goals</h2>
        </div>

        <div className="goal-count">
          {completedGoals}/{goals.length}
        </div>
      </div>

      <div className="goals">
        {goals.map((goal) => (
          <HabitCard
            key={goal.id}
            goal={goal}
            onToggle={onToggle}
          />
        ))}
      </div>

      <button className="add-goal">
        <Plus size={18} />
        Add a little goal
      </button>
    </section>
  );
}

export default DailyGoals;