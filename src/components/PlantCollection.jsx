import "../CSS/PlantCollection.css";

const plants = [
  {
    id: 1,
    name: "Little Sprout",
    icon: "🌱",
    xp: 0,
  },
  {
    id: 2,
    name: "Tulip",
    icon: "🌷",
    xp: 100,
  },
  {
    id: 3,
    name: "Sunflower",
    icon: "🌻",
    xp: 200,
  },
  {
    id: 4,
    name: "Blossom",
    icon: "🌸",
    xp: 300,
  },
  {
    id: 5,
    name: "Big Tree",
    icon: "🌳",
    xp: 500,
  },
  {
    id: 6,
    name: "Garden House",
    icon: "🏡",
    xp: 750,
  },
];

function PlantCollection({ xp }) {
  return (
    <section className="plant-collection">
      <div className="collection-heading">
        <div>
          <p className="section-label">YOUR WORLD</p>
          <h2>Garden collection</h2>
        </div>

        <span>
          {plants.filter((plant) => xp >= plant.xp).length}/
          {plants.length} unlocked
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