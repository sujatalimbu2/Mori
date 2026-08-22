import plants from "../data/plants";
import "../CSS/WorldPage.css";

function WorldPage({ xp, unlockedPlants }) {
  const milestones = [
    {
      xp: 100,
      icon: "🌷",
      title: "First Flower",
      description: "A little flower joins your garden.",
    },
    {
      xp: 200,
      icon: "🌻",
      title: "Golden Bloom",
      description: "Your garden begins to shine.",
    },
    {
      xp: 300,
      icon: "🌸",
      title: "Beautiful Bloom",
      description: "More beautiful things begin to grow.",
    },
    {
      xp: 500,
      icon: "🌳",
      title: "Growing Forest",
      description: "Your little garden becomes a forest.",
    },
    {
      xp: 750,
      icon: "🏡",
      title: "Little Home",
      description: "Your world finally has a home.",
    },
  ];

  const unlockedCount = plants.filter((plant) =>
    unlockedPlants.includes(plant.id)
  ).length;

  return (
    <section className="world-page">
      <div className="world-content">
        {/* Header */}
        <div className="world-icon">🌎</div>

        <p className="section-label">YOUR WORLD</p>

        <h1>A bigger world is growing.</h1>

        <p className="world-subtitle">
          Every habit you complete helps Mori become a
          little more alive. Keep growing and discover
          what comes next. 🌱
        </p>

        {/* Progress */}
        <div className="world-progress">
          <div>
            <span>World progress</span>

            <strong>
              {unlockedCount}/{plants.length}
            </strong>
          </div>

          <div className="world-progress-bar">
            <div
              className="world-progress-fill"
              style={{
                width: `${
                  plants.length > 0
                    ? (unlockedCount / plants.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* Discoveries */}
        <div className="discoveries">
          <div className="discoveries-heading">
            <div>
              <p className="section-label">DISCOVERIES</p>
              <h2>Things to grow</h2>
            </div>

            <span>{xp} XP</span>
          </div>

          <div className="milestone-list">
            {milestones.map((milestone) => {
              const unlocked = xp >= milestone.xp;

              return (
                <div
                  key={milestone.xp}
                  className={`milestone ${
                    unlocked ? "unlocked" : "locked"
                  }`}
                >
                  <div className="milestone-icon">
                    {unlocked ? milestone.icon : "🔒"}
                  </div>

                  <div className="milestone-info">
                    <h3>{milestone.title}</h3>

                    <p>{milestone.description}</p>
                  </div>

                  <div className="milestone-xp">
                    {unlocked
                      ? "Unlocked 🌿"
                      : `${milestone.xp} XP`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div className="world-preview">
          <span>🌱</span>
          <span>🌷</span>
          <span>🌻</span>
          <span>🌸</span>
          <span>🌳</span>
          <span>🏡</span>
        </div>

        <p className="world-status">
          Keep completing little habits. More of your
          world will bloom. 🌿
        </p>
      </div>
    </section>
  );
}

export default WorldPage;