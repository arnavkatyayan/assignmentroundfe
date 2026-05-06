import React from "react";

const Character = React.memo(({ character }) => {
  if (!character) {
    return null;
  }

  return (
    <div style={styles.card}>
      <img
        src={character.image}
        alt={character.name || "Character"}
        style={styles.image}
      />
      <h3>{character.name || "Unknown"}</h3>
      <p>Status: {character.status || "Unknown"}</p>
    </div>
  );
});

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    width: "200px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
  },
};

export default Character;