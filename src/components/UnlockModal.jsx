import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import "../CSS/UnlockModal.css";

function UnlockModal({ plant, onClose }) {
  return (
    <AnimatePresence>
      {plant && (
        <motion.div
          className="unlock-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="unlock-modal"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 18,
            }}
          >
            <button
              className="unlock-close"
              onClick={onClose}
            >
              <X size={18} />
            </button>

            <div className="unlock-sparkles">✨</div>

            <div className="unlock-plant">
              {plant.icon}
            </div>

            <p className="unlock-label">
              NEW PLANT UNLOCKED
            </p>

            <h2>{plant.name}</h2>

            <p className="unlock-message">
              Your little garden is growing beautifully.
            </p>

            <button
              className="unlock-button"
              onClick={onClose}
            >
              Add to my garden 🌿
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UnlockModal;