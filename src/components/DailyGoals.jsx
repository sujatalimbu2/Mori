import { useState } from "react";
import { Plus, X } from "lucide-react";
import HabitCard from "./HabitCard";
import "../CSS/DailyGoals.css";

function DailyGoals({ goals, onToggle, onAddGoal }) {
  const [showForm, setShowForm] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habitIcon, setHabitIcon] = useState("🌱");
  const [habitXP, setHabitXP] = useState(10);

  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = habitName.trim();

    if (!trimmedName) return;

    const newGoal = {
      id: Date.now(),
      icon: habitIcon,
      name: trimmedName,
      xp: Number(habitXP),
      completed: false,
    };

    onAddGoal(newGoal);

    setHabitName("");
    setHabitIcon("🌱");
    setHabitXP(10);
    setShowForm(false);
  };

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

      {!showForm && (
        <button
          className="add-goal"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add a little goal
        </button>
      )}

      {showForm && (
        <div className="habit-form-container">
          <div className="habit-form-header">
            <div>
              <p className="section-label">NEW HABIT</p>
              <h3>Plant a little habit 🌱</h3>
            </div>

            <button
              className="close-form"
              onClick={() => setShowForm(false)}
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              What do you want to grow?
              <input
                type="text"
                placeholder="e.g. Practice coding"
                value={habitName}
                onChange={(event) =>
                  setHabitName(event.target.value)
                }
                autoFocus
              />
            </label>

            <label>
              Choose an icon

              <div className="icon-options">
                {["🌱", "📚", "💧", "🏃", "🧘", "🎨", "💻", "🎵"].map(
                  (icon) => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${
                        habitIcon === icon ? "selected" : ""
                      }`}
                      onClick={() => setHabitIcon(icon)}
                    >
                      {icon}
                    </button>
                  )
                )}
              </div>
            </label>

            <label>
              XP reward
              <select
                value={habitXP}
                onChange={(event) =>
                  setHabitXP(Number(event.target.value))
                }
              >
                <option value={5}>5 XP</option>
                <option value={10}>10 XP</option>
                <option value={15}>15 XP</option>
                <option value={20}>20 XP</option>
              </select>
            </label>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button type="submit" className="save-habit">
                <Plus size={17} />
                Plant Habit
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default DailyGoals;