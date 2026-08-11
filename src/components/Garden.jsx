import { motion } from "framer-motion";


function Garden({ xp }) {
  const getGardenStage = () => {
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
      plant: "🌳✨",
      message: "Your garden is flourishing!",
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
      <div className="sun">☀️</div>

      <div className="cloud cloud-one">☁️</div>
      <div className="cloud cloud-two">☁️</div>

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

      {/* Main growing plant */}
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

      {stage !== "seed" && (
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
      )}

      <div className="flowers">
        <span>🌷</span>
        <span>🌱</span>
        <span>🌻</span>
        <span>🌸</span>
        <span>🌿</span>
      </div>

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

      <div className="garden-house">🏡</div>

      <div className="garden-title">
        <h2>Your Little Garden</h2>
        <p>{currentGarden.message}</p>
      </div>
    </motion.section>
  );
}

export default Garden;