import { useState } from "react";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import "../CSS/History.css";

function History({ history, goals }) {
  const [currentDate, setCurrentDate] = useState(new Date());

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
      completed: completedIds.length,
      total: goals.length,
    };
  });

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
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

  return (
    <section className="history-section">
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
          {Array.from({ length: firstDay }).map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day empty" />
          ))}

          {days.map((day) => {
            const perfect = day.total > 0 && day.completed === day.total;

            const started = day.completed > 0;

            return (
              <div
                key={day.dateKey}
                className={`calendar-day ${
                  started ? "started" : ""
                } ${perfect ? "perfect" : ""} ${
                  isToday(day.day) ? "today" : ""
                }`}
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
              </div>
            );
          })}
        </div>

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
    </section>
  );
}

export default History;
