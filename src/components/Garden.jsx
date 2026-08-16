import { motion } from "framer-motion";
import "../CSS/Garden.css";

function Garden({ xp }) {
  const getGardenStage = () => {
    if (xp >= 500) return "magical";
    if (xp >= 300) return "mature";
    if (xp >= 200) return "growing";
    if (xp >= 100) return "sprout";
    return "seed";
  };

  const stage = getGardenStage();

  const gardenData = {
    seed: {
      plant: "🌱",
      message: "Your first little sprout is growing.",
    },

    sprout: {
      plant: "🌿",
      message: "Your garden is beginning to bloom.",
    },

    growing: {
      plant: "🌳",
      message: "Your little garden is getting greener.",
    },

    mature: {
      plant: "🌳",
      message: "Your garden is flourishing!",
    },

    magical: {
      plant: "🌳🌸✨",
      message: "Your garden is magical!",
    },
  };

  const currentGarden = gardenData[stage];

  return (
    <motion.section
      className={`garden garden-${stage}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Sky */}
      <div className="sun">☀️</div>

      <div className="cloud cloud-one">☁️</div>
      <div className="cloud cloud-two">☁️</div>

      {/* Butterfly appears when garden starts growing */}
      {stage !== "seed" && (
        <motion.div
          className="butterfly"
          animate={{
            y: [0, -10, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🦋
        </motion.div>
      )}

      {/* Main plant */}
      <motion.div
        className="main-plant"
        key={stage}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
        }}
      >
        {currentGarden.plant}
      </motion.div>

      {/* Trees appear at growing stage */}
      {stage === "growing" ||
      stage === "mature" ||
      stage === "magical" ? (
        <>
          <motion.div
            className="tree tree-one"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            🌳
          </motion.div>

          <motion.div
            className="tree tree-two"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            🌳
          </motion.div>
        </>
      ) : null}

      {/* Flowers appear at mature stage */}
      {stage === "mature" || stage === "magical" ? (
        <motion.div
          className="flowers"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span>🌷</span>
          <span>🌱</span>
          <span>🌻</span>
          <span>🌸</span>
          <span>🌿</span>
        </motion.div>
      ) : null}

      {/* Rabbit appears when garden is flourishing */}
      {stage === "mature" || stage === "magical" ? (
        <motion.div
          className="rabbit"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🐇
        </motion.div>
      ) : null}

      {/* House is the final unlock */}
      {stage === "magical" && (
        <motion.div
          className="garden-house"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.7,
            type: "spring",
          }}
        >
          🏡
        </motion.div>
      )}

      {/* Garden information */}
      <div className="garden-title">
        <h2>Your Little Garden</h2>

        <p>{currentGarden.message}</p>

        <span className="garden-stage">
          {xp} XP
        </span>
      </div>
    </motion.section>
  );
}

export default Garden;