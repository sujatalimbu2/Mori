import { Check, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

function HabitCard({ goal, onToggle, onDelete }) {
  return (
    <motion.div
      className={`goal ${goal.completed ? "completed" : ""}`}
      whileTap={{ scale: 0.98 }}
    >
      <button
        className="check-button"
        onClick={() => onToggle(goal.id)}
      >
        {goal.completed && <Check size={16} />}
      </button>

      <span className="goal-icon">{goal.icon}</span>

      <div className="goal-info">
        <span className="goal-name">{goal.name}</span>
        <span className="goal-xp">+{goal.xp} XP</span>
      </div>

      {goal.completed && (
        <span className="done-text">Done 🌿</span>
      )}

      <button
        className="delete-goal-button"
        onClick={() => onDelete(goal.id)}
        aria-label={`Delete ${goal.name}`}
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
}

export default HabitCard;