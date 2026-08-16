import { useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GardenPage from "./pages/GardenPage";
import HabitsPage from "./pages/HabitsPage";
import JournalPage from "./pages/JournalPage";
import WorldPage from "./pages/WorldPage";

import Navbar from "./components/Navbar";

import UnlockModal from "./components/UnlockModal";

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

  const addGoal = (name, icon, xp) => {
      const newGoal = {
        id: Date.now(),
        icon,
        name,
        xp: Number(xp),
        completed: false,
      };

      setGoals((currentGoals) => [...currentGoals, newGoal]);
    };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar xp={xp} streak={streak} />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <GardenPage xp={xp} gardenLevel={gardenLevel} streak={streak} />
              }
            />

            <Route
              path="/habits"
              element={<HabitsPage goals={goals} onToggle={toggleGoal} onAddGoal={addGoal} />}
            />

            <Route
              path="/journal"
              element={<JournalPage history={history} goals={goals} />}
            />

            <Route path="/world" element={<WorldPage />} />
          </Routes>
        </main>

        <footer>
          <p>Small habits. Beautiful growth. 🌿</p>
        </footer>

        <UnlockModal
          plant={unlockedPlant}
          onClose={() => setUnlockedPlant(null)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
