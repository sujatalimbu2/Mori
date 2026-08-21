import { motion } from "framer-motion";
import "../CSS/Garden.css";

function Garden({ xp, unlockedPlants }) {
  const showTulip = unlockedPlants.includes(2);
  const showSunflower = unlockedPlants.includes(3);
  const showBlossom = unlockedPlants.includes(4);
  const showTree = unlockedPlants.includes(5);
  const showHouse = unlockedPlants.includes(6);

  return (
    <motion.section
      className="garden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* ☀️ Sun */}
      <div className="sun">☀️</div>

      {/* ☁️ Clouds */}
      <div className="cloud cloud-one">☁️</div>
      <div className="cloud cloud-two">☁️</div>

      {/* 🦋 Butterfly */}
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

      {/* 🌱 Main plant */}
      <motion.div
        className="main-plant"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
        }}
      >
        🌱
      </motion.div>

      {/* 🌳 Trees */}
      {showTree && (
        <>
          <motion.div
            className="tree tree-one"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.7,
              type: "spring",
            }}
          >
            🌳
          </motion.div>

          <motion.div
            className="tree tree-two"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.7,
              type: "spring",
              delay: 0.15,
            }}
          >
            🌳
          </motion.div>
        </>
      )}

      {/* 🌷 Garden flowers */}
      <div className="flowers">
        {/* 🌱 Always available */}
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
          🌱
        </motion.span>

        {/* 🌷 100 XP */}
        {showTulip && (
          <motion.span
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring" }}
          >
            🌷
          </motion.span>
        )}

        {/* 🌻 200 XP */}
        {showSunflower && (
          <motion.span
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              delay: 0.1,
            }}
          >
            🌻
          </motion.span>
        )}

        {/* 🌸 300 XP */}
        {showBlossom && (
          <motion.span
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              delay: 0.2,
            }}
          >
            🌸
          </motion.span>
        )}
      </div>

      {/* 🐇 Rabbit */}
      <motion.div
        className="rabbit"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🐇
      </motion.div>

      {/* 🏡 House */}
      {showHouse && (
        <motion.div
          className="garden-house"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.7,
            type: "spring",
          }}
        >
          🏡
        </motion.div>
      )}

      {/* 🌿 Garden title */}
      <div className="garden-title">
        <h2>Your Little Garden</h2>

        <p>
          {xp >= 750
            ? "Your garden is flourishing beautifully."
            : xp >= 500
              ? "Your little world is becoming a forest."
              : xp >= 300
                ? "Beautiful things are beginning to bloom."
                : xp >= 200
                  ? "Your garden is getting brighter."
                  : xp >= 100
                    ? "A new flower has joined your garden."
                    : "Your first little sprout is growing."}
        </p>
      </div>
    </motion.section>
  );
}

export default Garden;
