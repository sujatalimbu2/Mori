import Garden from "../components/Garden";
import PlantCollection from "../components/PlantCollection";
import StreakCard from "../components/StreakCard";
import XPBar from "../components/XPBar";
import "../CSS/GardenPage.css";
import "../CSS/Garden.css";

function GardenPage({ xp, gardenLevel, streak }) {
  return (
    <section className="garden-page">
      <div className="garden-intro">
        <p className="section-label">YOUR LITTLE WORLD</p>

        <h1>
          Good evening, <span>gardener.</span> 🌱
        </h1>

        <p>
          Every little step helps your garden grow.
        </p>
      </div>

      <Garden xp={xp} />

      <section className="progress-row">
        <StreakCard streak={streak} />

        <XPBar
          xp={xp}
          level={gardenLevel}
        />
      </section>

      <PlantCollection xp={xp} />

      <div className="garden-message">
        <p>Small habits. Beautiful growth. 🌿</p>
      </div>
    </section>
  );
}

export default GardenPage;