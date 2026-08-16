import "../CSS/PlantCollection.css";
import plants from "../data/plants";

function PlantCollection({ xp }) {
  const unlockedCount = plants.filter(
    (plant) => xp >= plant.xp
  ).length;

  return (
    <section className="plant-collection">
      <div className="collection-heading">
        <div>
          <p className="section-label">YOUR WORLD</p>
          <h2>Garden collection</h2>
        </div>

        <span>
          {unlockedCount}/{plants.length} unlocked
        </span>
      </div>

      <div className="plants-grid">
        {plants.map((plant) => {
          const unlocked = xp >= plant.xp;

          return (
            <div
              key={plant.id}
              className={`plant-card ${
                unlocked ? "unlocked" : "locked"
              }`}
            >
              <div className="plant-icon">
                {unlocked ? plant.icon : "🔒"}
              </div>

              <h3>{plant.name}</h3>

              {unlocked ? (
                <p>Unlocked 🌿</p>
              ) : (
                <p>{plant.xp} XP needed</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PlantCollection;