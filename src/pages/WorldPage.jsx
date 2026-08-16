import "../CSS/WorldPage.css";

function WorldPage() {
  return (
    <section className="world-page">
      <div className="world-content">
        <div className="world-icon">🌎</div>

        <p className="section-label">YOUR WORLD</p>

        <h1>A bigger world is growing.</h1>

        <p className="world-subtitle">
          Soon you'll be able to explore new places,
          discover special plants, and grow your little
          world in Mori. 🌱
        </p>

        <div className="world-preview">
          <span>🌱</span>
          <span>🌷</span>
          <span>🌳</span>
          <span>🌸</span>
          <span>🏡</span>
        </div>

        <p className="world-status">
          More discoveries are coming soon...
        </p>
      </div>
    </section>
  );
}

export default WorldPage;