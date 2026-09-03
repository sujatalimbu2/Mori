import { useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GardenPage from "./pages/GardenPage";
import HabitsPage from "./pages/HabitsPage";
import JournalPage from "./pages/JournalPage";
import WorldPage from "./pages/WorldPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

import UnlockModal from "./components/UnlockModal";

import initialGoals from "./data/habits";
import plants from "./data/plants";

import {
  getTodayKey,
  getYesterdayKey,
  getSavedHistory,
  saveHistory,
} from "./data/history";

function App() {
  const [history, setHistory] = useState(() => {
    return getSavedHistory();
  });

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("mori-goals");
    const savedDate = localStorage.getItem("mori-goals-date");
    const today = getTodayKey();

    if (!savedGoals) {
      return initialGoals;
    }

    const parsedGoals = JSON.parse(savedGoals);

    // New day → reset completed status
    if (savedDate !== today) {
      return parsedGoals.map((goal) => ({
        ...goal,
        completed: false,
      }));
    }

    return parsedGoals;
  });

  const [xp, setXp] = useState(() => {
    const savedXP = localStorage.getItem("mori-xp");
    return savedXP ? Number(savedXP) : 290;
  });
  const milestones = [0, 100, 200, 300, 500, 750];

  const gardenLevel = milestones.filter((milestone) => xp >= milestone).length;
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem("mori-streak");
    return savedStreak ? Number(savedStreak) : 7;
  });

  const [streakCompleted, setStreakCompleted] = useState(() => {
    const saved = localStorage.getItem("mori-streak-completed");
    return saved === "true";
  });
  const [unlockedPlant, setUnlockedPlant] = useState(null);

  const [unlockedPlants, setUnlockedPlants] = useState(() => {
    const saved = localStorage.getItem("mori-unlocked-plants");
    return saved ? JSON.parse(saved) : [1];
  });

  useEffect(() => {
    localStorage.setItem(
      "mori-unlocked-plants",
      JSON.stringify(unlockedPlants),
    );
  }, [unlockedPlants]);

  // Save goals
  useEffect(() => {
    localStorage.setItem("mori-goals", JSON.stringify(goals));
    localStorage.setItem("mori-goals-date", getTodayKey());
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

    // Check if new plants were unlocked
    if (!selectedGoal.completed) {
      const newlyUnlocked = plants.filter(
        (plant) => newXp >= plant.xp && !unlockedPlants.includes(plant.id),
      );

      if (newlyUnlocked.length > 0) {
        const firstUnlocked = newlyUnlocked[0];

        // Show the first newly unlocked plant in the popup
        setUnlockedPlant(firstUnlocked);

        // Permanently save all newly unlocked plants
        setUnlockedPlants((currentPlants) => [
          ...new Set([
            ...currentPlants,
            ...newlyUnlocked.map((plant) => plant.id),
          ]),
        ]);
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
    // Streak
    const allCompleted = updatedGoals.every((goal) => goal.completed);

    if (allCompleted && !streakCompleted) {
      const yesterday = getYesterdayKey();

      const yesterdayCompletedIds = history[yesterday] || [];

      const yesterdayWasComplete =
        goals.length > 0 && yesterdayCompletedIds.length === goals.length;

      setStreak((currentStreak) => {
        if (yesterdayWasComplete) {
          return currentStreak + 1;
        }

        return 1;
      });

      setStreakCompleted(true);
    }

    if (!allCompleted) {
      setStreakCompleted(false);
    }
  };

  const addGoal = (name, icon, xp) => {
    const newGoal = {
      id: Date.now(),
      name,
      icon,
      xp: Number(xp),
      completed: false,
    };

    setGoals((currentGoals) => [...currentGoals, newGoal]);
  };
  const deleteGoal = (id) => {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
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
                <GardenPage
                  xp={xp}
                  gardenLevel={gardenLevel}
                  streak={streak}
                  unlockedPlants={unlockedPlants}
                />
              }
            />

            <Route
              path="/habits"
              element={
                <HabitsPage
                  goals={goals}
                  onToggle={toggleGoal}
                  onAddGoal={addGoal}
                  onDeleteGoal={deleteGoal}
                />
              }
            />

            <Route
              path="/journal"
              element={<JournalPage history={history} goals={goals} />}
            />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  xp={xp}
                  streak={streak}
                  unlockedPlants={unlockedPlants}
                />
              }
            />
            <Route
              path="/world"
              element={<WorldPage xp={xp} unlockedPlants={unlockedPlants} />}
            />
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
