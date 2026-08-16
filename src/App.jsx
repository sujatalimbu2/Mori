import { useEffect, useState } from "react";
import "./index.css";

import Navbar from "./components/Navbar";
import Garden from "./components/Garden";
import DailyGoals from "./components/DailyGoals";
import StreakCard from "./components/StreakCard";
import XPBar from "./components/XPBar";
import PlantCollection from "./components/PlantCollection";
import UnlockModal from "./components/UnlockModal";
import History from "./components/History";

import initialGoals from "./data/habits";
import plants from "./data/plants";

import { getTodayKey, getSavedHistory, saveHistory } from "./data/history";

function App() {
  const [history, setHistory] = useState(() => {
    return getSavedHistory();
  });

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("mori-goals");
    return savedGoals ? JSON.parse(savedGoals) : initialGoals;
  });

  const [xp, setXp] = useState(() => {
    const savedXP = localStorage.getItem("mori-xp");
    return savedXP ? Number(savedXP) : 290;
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

  const [unlockedPlant, setUnlockedPlant] = useState(null);



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

  const toggleGoal = (id) => {
    const selectedGoal = goals.find((goal) => goal.id === id);

    if (!selectedGoal) return;

    const updatedGoals = goals.map((goal) => {
      if (goal.id !== id) return goal;

      return {
        ...goal,
        completed: !goal.completed,
      };
    });

    const xpChange = selectedGoal.completed
      ? -selectedGoal.xp
      : selectedGoal.xp;

    const newXp = Math.max(0, xp + xpChange);

    // Check if a new plant was unlocked
    if (!selectedGoal.completed) {
      const previouslyUnlocked =
        Number(localStorage.getItem("mori-unlocked-xp")) || 0;

      const newlyUnlocked = plants
        .filter((plant) => newXp >= plant.xp && plant.xp > previouslyUnlocked)
        .sort((a, b) => b.xp - a.xp)[0];

      if (newlyUnlocked) {
        setUnlockedPlant(newlyUnlocked);
        localStorage.setItem("mori-unlocked-xp", newXp);
      }
    }

    setGoals(updatedGoals);
    setXp(newXp);

    // Save today's completed habits
    const today = getTodayKey();

    const completedGoalIds = updatedGoals
      .filter((goal) => goal.completed)
      .map((goal) => goal.id);

    setHistory((currentHistory) => ({
      ...currentHistory,
      [today]: completedGoalIds,
    }));

    // Streak
    const allCompleted = updatedGoals.every((goal) => goal.completed);

    if (allCompleted && !streakCompleted) {
      setStreak((currentStreak) => currentStreak + 1);
      setStreakCompleted(true);
    }

    if (!allCompleted) {
      setStreakCompleted(false);
    }
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
        <History history={history} goals={goals} />
      </main>

      <footer>
        <p>Small habits. Beautiful growth. 🌿</p>
      </footer>
      <UnlockModal
        plant={unlockedPlant}
        onClose={() => setUnlockedPlant(null)}
      />
    </div>
  );
}

export default App;
