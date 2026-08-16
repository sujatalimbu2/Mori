import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import "../CSS/AddHabitModal.css";

const icons = ["🌱", "📚", "💧", "🏃", "🧘", "🎨", "💻", "🎵"];

function AddHabitModal({ isOpen, onClose, onAddGoal }) {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("🌱");
  const [xp, setXp] = useState(10);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    onAddGoal(
      name.trim(),
      selectedIcon,
      Number(xp)
    );

    setName("");
    setSelectedIcon("🌱");
    setXp(10);

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="habit-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="habit-modal"
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="habit-modal-close"
              onClick={onClose}
              type="button"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <p className="habit-modal-eyebrow">
              NEW HABIT
            </p>

            <h2>
              Plant a little habit 🌱
            </h2>

            <form onSubmit={handleSubmit}>
              <label className="habit-field">
                <span>What do you want to grow?</span>

                <input
                  type="text"
                  placeholder="e.g. Practice coding"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  autoFocus
                />
              </label>

              <div className="habit-field">
                <span>Choose an icon</span>

                <div className="icon-picker">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${
                        selectedIcon === icon
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedIcon(icon)
                      }
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <label className="habit-field">
                <span>XP reward</span>

                <select
                  value={xp}
                  onChange={(event) =>
                    setXp(Number(event.target.value))
                  }
                >
                  <option value={5}>5 XP</option>
                  <option value={10}>10 XP</option>
                  <option value={15}>15 XP</option>
                  <option value={20}>20 XP</option>
                  <option value={25}>25 XP</option>
                </select>
              </label>

              <div className="habit-modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="plant-button"
                >
                  <Plus size={20} />
                  Plant Habit
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddHabitModal;