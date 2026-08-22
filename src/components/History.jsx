import { useState } from "react";
import { ChevronLeft, ChevronRight, Leaf, Check, Circle } from "lucide-react";
import "../CSS/History.css";

function History({ history, goals }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;

    const dateKey = `${year}-${String(month + 1).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;

    const completedIds = history[dateKey] || [];

    return {
      day,
      dateKey,
      completedIds,
      completed: completedIds.length,
      total: goals.length,
    };
  });

  const previousMonth = () => {
    setSelectedDate(null);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(null);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const selectedDay = days.find((day) => day.dateKey === selectedDate);

  return (
    <section className="history-section">
      {/* Header */}
      <div className="history-header">
        <div>
          <p className="section-label">YOUR GROWTH</p>

          <h2>Habit history</h2>

          <p className="history-subtitle">Every little day adds up. 🌱</p>
        </div>

        <div className="month-controls">
          <button onClick={previousMonth}>
            <ChevronLeft size={18} />
          </button>

          <strong>{monthName}</strong>

          <button onClick={nextMonth}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="history-card">
        <div className="weekdays">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="calendar">
          {/* Empty spaces before first day */}
          {Array.from({ length: firstDay }).map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day empty" />
          ))}

          {/* Days */}
          {days.map((day) => {
            const perfect = day.total > 0 && day.completed === day.total;

            const started = day.completed > 0;

            const selected = selectedDate === day.dateKey;

            return (
              <button
                key={day.dateKey}
                className={`calendar-day ${
                  started ? "started" : ""
                } ${perfect ? "perfect" : ""} ${
                  isToday(day.day) ? "today" : ""
                } ${selected ? "selected" : ""}`}
                onClick={() => setSelectedDate(day.dateKey)}
              >
                <span className="day-number">{day.day}</span>

                <span className="day-leaf">
                  {perfect ? "🌿" : started ? <Leaf size={15} /> : ""}
                </span>

                {started && (
                  <span className="day-progress">
                    {day.completed}/{day.total}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="history-legend">
          <span>
            <i className="legend-dot empty-dot" />
            No goals
          </span>

          <span>
            <i className="legend-dot started-dot" />
            Started
          </span>

          <span>
            <i className="legend-dot perfect-dot" />
            All goals
          </span>
        </div>
      </div>

      {/* Selected day */}
      {selectedDay && (
        <div className="day-details">
          <div className="day-details-header">
            <div>
              <p className="section-label">DAILY GROWTH</p>

              <h3>
                {new Date(`${selectedDay.dateKey}T00:00:00`).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  },
                )}
              </h3>
            </div>

            <div className="day-score">
              {selectedDay.completed}/{selectedDay.total}
            </div>
          </div>

          {selectedDay.total === 0 ? (
            <p className="empty-day-message">
              No habits yet. Plant a little habit first. 🌱
            </p>
          ) : (
            <div className="day-goals">
              {goals.map((goal) => {
                const completed = selectedDay.completedIds.includes(goal.id);

                return (
                  <div
                    key={goal.id}
                    className={`history-goal ${completed ? "completed" : ""}`}
                  >
                    <div className="history-goal-icon">{goal.icon}</div>

                    <div className="history-goal-info">
                      <span>{goal.name}</span>

                      <small>
                        {completed ? `+${goal.xp} XP` : "Not completed"}
                      </small>
                    </div>

                    <div className="history-goal-status">
                      {completed ? <Check size={18} /> : <Circle size={17} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedDay.total > 0 &&
            selectedDay.completed === selectedDay.total && (
              <div className="perfect-day-message">
                🌿 Perfect day! Every little habit helped your garden grow.
              </div>
            )}

          {selectedDay.completed > 0 &&
            selectedDay.completed < selectedDay.total && (
              <div className="growing-day-message">
                🌱 Good start! Keep growing tomorrow.
              </div>
            )}

          {selectedDay.completed === 0 && (
            <div className="quiet-day-message">
              🌙 A quiet day is okay. Tomorrow is another chance to grow.
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default History;
