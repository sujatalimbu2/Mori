import { useState } from "react";
import "../CSS/ProfilePage.css";

function ProfilePage({ xp, streak, unlockedPlants }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("mori-profile");

    return saved
      ? JSON.parse(saved)
      : {
          name: "Gardener",
          avatar: "🌱",
          quote: "Growing a little every day.",
        };
  });

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(profile.name);
  const [quote, setQuote] = useState(profile.quote);

  const saveProfile = () => {
    const updatedProfile = {
      ...profile,
      name: name.trim() || "Gardener",
      quote: quote.trim() || "Growing a little every day.",
    };

    setProfile(updatedProfile);

    localStorage.setItem(
      "mori-profile",
      JSON.stringify(updatedProfile)
    );

    setEditing(false);
  };

  return (
    <section className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">
          {profile.avatar}
        </div>

        {!editing ? (
          <>
            <p className="section-label">YOUR PROFILE</p>

            <h1>{profile.name}</h1>

            <p className="profile-quote">
              {profile.quote}
            </p>

            <button
              className="edit-profile-button"
              onClick={() => setEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          </>
        ) : (
          <div className="profile-form">
            <label>
              Name
              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />
            </label>

            <label>
              Your quote
              <input
                value={quote}
                onChange={(event) =>
                  setQuote(event.target.value)
                }
              />
            </label>

            <div className="profile-actions">
              <button
                className="cancel-profile-button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>

              <button
                className="save-profile-button"
                onClick={saveProfile}
              >
                Save 🌱
              </button>
            </div>
          </div>
        )}

        <div className="profile-stats">
          <div className="profile-stat">
            <span>🔥</span>
            <strong>{streak}</strong>
            <p>Day streak</p>
          </div>

          <div className="profile-stat">
            <span>⭐</span>
            <strong>{xp}</strong>
            <p>Total XP</p>
          </div>

          <div className="profile-stat">
            <span>🌿</span>
            <strong>{unlockedPlants.length}</strong>
            <p>Plants</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;