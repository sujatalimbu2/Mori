import { useState } from "react";
import AvatarIcon from "../components/AvatarIcon";
import "../CSS/ProfilePage.css";

const avatarOptions = ["sprout", "flower", "leaf", "mushroom", "bunny"];

function ProfilePage({ xp, streak, unlockedPlants }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("mori-profile");

    return saved
      ? JSON.parse(saved)
      : {
          name: "Gardener",
          avatar: "sprout",
          quote: "Growing a little every day.",
        };
  });

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(profile.name);
  const [quote, setQuote] = useState(profile.quote);
  const [selectedAvatar, setSelectedAvatar] = useState(
    profile.avatar || "sprout",
  );

  const saveProfile = () => {
    const updatedProfile = {
      ...profile,
      name: name.trim() || "Gardener",
      avatar: selectedAvatar,
      quote: quote.trim() || "Growing a little every day.",
    };

    setProfile(updatedProfile);

    localStorage.setItem("mori-profile", JSON.stringify(updatedProfile));

    // Tell Navbar that the avatar changed
    window.dispatchEvent(new Event("mori-profile-updated"));

    setEditing(false);
  };

  const cancelEditing = () => {
    setName(profile.name);
    setQuote(profile.quote);
    setSelectedAvatar(profile.avatar || "sprout");
    setEditing(false);
  };

  const achievements = [
    {
      icon: "🌱",
      name: "First Sprout",
      description: "Start growing your garden",
      unlocked: xp >= 1,
    },
    {
      icon: "🔥",
      name: "Growing Streak",
      description: "Reach a 7 day streak",
      unlocked: streak >= 7,
    },
    {
      icon: "🌷",
      name: "First Flower",
      description: "Unlock your first flower",
      unlocked: unlockedPlants.length >= 2,
    },
    {
      icon: "🌳",
      name: "Little Forest",
      description: "Unlock 5 plants",
      unlocked: unlockedPlants.length >= 5,
    },
    {
      icon: "⭐",
      name: "XP Gardener",
      description: "Reach 500 XP",
      unlocked: xp >= 500,
    },
  ];

  return (
    <section className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <AvatarIcon type={profile.avatar || "sprout"} size={60} />
        </div>

        {!editing ? (
          <>
            <p className="section-label">YOUR PROFILE</p>

            <h1>{profile.name}</h1>

            <p className="profile-quote">{profile.quote}</p>

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
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label>
              Your quote
              <input
                value={quote}
                onChange={(event) => setQuote(event.target.value)}
              />
            </label>

            <div className="avatar-picker">
              <p>Choose your gardener</p>

              <div className="avatar-options">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    className={`avatar-option ${
                      selectedAvatar === avatar ? "selected" : ""
                    }`}
                    onClick={() => setSelectedAvatar(avatar)}
                    aria-label={`Choose ${avatar} avatar`}
                  >
                    <AvatarIcon type={avatar} size={45} />
                  </button>
                ))}
              </div>
            </div>

            <div className="profile-actions">
              <button className="cancel-profile-button" onClick={cancelEditing}>
                Cancel
              </button>

              <button className="save-profile-button" onClick={saveProfile}>
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
        <section className="achievements">
          <div className="achievements-heading">
            <div>
              <p className="section-label">YOUR JOURNEY</p>
              <h2>Achievements</h2>
            </div>

            <span>
              {
                achievements.filter((achievement) => achievement.unlocked)
                  .length
              }
              /{achievements.length}
            </span>
          </div>

          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div
                key={achievement.name}
                className={`achievement ${
                  achievement.unlocked ? "unlocked" : "locked"
                }`}
              >
                <div className="achievement-icon">
                  {achievement.unlocked ? achievement.icon : "🔒"}
                </div>

                <div>
                  <h3>{achievement.name}</h3>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default ProfilePage;
