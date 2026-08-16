import Garden from "../components/Garden";
import PlantCollection from "../components/PlantCollection";
import StreakCard from "../components/StreakCard";
import XPBar from "../components/XPBar";

function GardenPage({
  xp,
  gardenLevel,
  streak,
}) {
  return (
    <>
      <Garden xp={xp} />

      <section className="progress-row">
        <StreakCard streak={streak} />

        <XPBar
          xp={xp}
          level={gardenLevel}
        />
      </section>

      <PlantCollection xp={xp} />

      <section className="garden-message">
        <p>
          Small habits. Beautiful growth. 🌿
        </p>
      </section>
    </>
  );
}

export default GardenPage;