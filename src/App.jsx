import { useEffect, useState } from "react";
import "./index.css";

import Navbar from "./components/Navbar";
import Garden from "./components/Garden";
import DailyGoals from "./components/DailyGoals";
import StreakCard from "./components/StreakCard";
import XPBar from "./components/XPBar";
import PlantCollection from "./components/PlantCollection";

const initialGoals = [
  {
    id: 1,
    icon: "📚",
    name: "Study for 30 minutes",
    xp: 10,
    completed: true,
  },
  {
    id: 2,
    icon: "💧",
    name: "Drink enough water",
    xp: 10,
    completed: true,
  },
  {
    id: 3,
    icon: "🏃",
    name: "Move your body",
    xp: 15,
    completed: false,
  },
  {
    id: 4,
    icon: "📖",
    name: "Read 10 pages",
    xp: 10,
    completed: false,
  },
  {
    id: 5,
    icon: "🧘",
    name: "Take a quiet moment",
    xp: 10,
    completed: true,
  },
];

function App() {
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("mori-goals");
    return savedGoals ? JSON.parse(savedGoals) : initialGoals;
  });

  const [xp, setXp] = useState(() => {
    const savedXP = localStorage.getItem("mori-xp");
    return savedXP ? Number(savedXP) : 240;
  });

  const [gardenLevel] = useState(4);

  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem("mori-streak");
    return savedStreak ? Number(savedStreak) : 7;
  });

  const [streakCompleted, setStreakCompleted] = useState(() => {
    const saved = localStorage.getItem("mori-streak-completed");
    return saved === "true";
  });

  // Save goals
  useEffect(() => {
    localStorage.setItem("mori-goals", JSON.stringify(goals));
  }, [goals]);

  // Save XP
  useEffect(() => {
    localStorage.setItem("mori-xp", xp);
  }, [xp]);

  // Save streak
  useEffect(() => {
    localStorage.setItem("mori-streak", streak);
  }, [streak]);

  // Save streak completion
  useEffect(() => {
    localStorage.setItem("mori-streak-completed", streakCompleted);
  }, [streakCompleted]);

  const completedGoals = goals.filter((goal) => goal.completed).length;

  const toggleGoal = (id) => {
    setGoals((currentGoals) => {
      const updatedGoals = currentGoals.map((goal) => {
        if (goal.id !== id) return goal;

        if (!goal.completed) {
          setXp((currentXp) => currentXp + goal.xp);
        } else {
          setXp((currentXp) => Math.max(0, currentXp - goal.xp));
        }

        return {
          ...goal,
          completed: !goal.completed,
        };
      });

      const allCompleted = updatedGoals.every((goal) => goal.completed);

      if (allCompleted && !streakCompleted) {
        setStreak((currentStreak) => currentStreak + 1);
        setStreakCompleted(true);
      }

      if (!allCompleted) {
        setStreakCompleted(false);
      }

      return updatedGoals;
    });
  };

  return (
    <div className="app">
      <Navbar xp={xp} />

      <main>
        <section className="welcome">
          <p className="eyebrow">Tuesday, August 11</p>

          <h1>
            Good evening, <span>gardener.</span>
          </h1>

          <p className="subtitle">Every little step helps your garden grow.</p>
        </section>

        <Garden xp={xp} />

        <DailyGoals goals={goals} onToggle={toggleGoal} />

        <section className="progress-row">
          <StreakCard streak={streak} />

          <XPBar xp={xp} level={gardenLevel} />

          <div className="progress-card">
            <div className="card-icon">🌸</div>

            <div>
              <p>Plants grown</p>
              <h3>8 plants</h3>
              <span>2 new this week</span>
            </div>
          </div>
        </section>
        <PlantCollection xp={xp} />
      </main>

      <footer>
        <p>Small habits. Beautiful growth. 🌿</p>
      </footer>
    </div>
  );
}

export default App;
