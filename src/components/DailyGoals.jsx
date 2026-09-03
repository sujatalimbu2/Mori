import { useState } from "react";
import { Plus } from "lucide-react";
import HabitCard from "./HabitCard";
import AddHabitModal from "./AddHabitModal";
import "../CSS/DailyGoals.css";

function DailyGoals({ goals, onToggle, onAddGoal, onDeleteGoal, }) {
  const [showAddHabit, setShowAddHabit] = useState(false);

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
            onDelete={onDeleteGoal}
          />
        ))}
      </div>

      <button
        className="add-goal"
        onClick={() => setShowAddHabit(true)}
      >
        <Plus size={18} />
        Add a little habit
      </button>

      <AddHabitModal
        isOpen={showAddHabit}
        onClose={() => setShowAddHabit(false)}
        onAddGoal={onAddGoal}
      />
    </section>
  );
}

export default DailyGoals;