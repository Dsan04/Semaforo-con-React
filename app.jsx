import { useState, useEffect } from "react";

export default function App() {
  const [color, setColor] = useState(""); // cambiar el estado del semaf
  const [auto, setAuto] = useState(false); 

  const colores = ["red", "yellow", "green"];

  // cambio de color cada 1,5
  useEffect(() => {
    if (!auto) return;
    let i = colores.indexOf(color);
    const interval = setInterval(() => {
      i = (i + 1) % colores.length;
      setColor(colores[i]);
    }, 1500);
    return () => clearInterval(interval);
  }, [auto, color]);

  return (
    <div style={styles.container}>
      <h1>semaforo react</h1>

      {/* color act */}
      <div
        style={{
          ...styles.luz,
          backgroundColor: color || "gray",
        }}
      ></div>

      {/* boton manual*/}
      <div style={styles.botones}>
        {colores.map((c) => (
          <button
            key={c}
            style={{
              ...styles.boton,
              backgroundColor: c,
              opacity: color === c ? 0.5 : 1,
              cursor: color === c ? "not-allowed" : "pointer",
            }}
            onClick={() => setColor(c)}
            disabled={color === c}
          >
            {c}
          </button>
        ))}
      </div>

      {/* boton auto on/off*/}
      <button style={styles.auto} onClick={() => setAuto(!auto)}>
        {auto ? "detener" : "modo automatico"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
  },
  luz: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "2px solid #333",
    backgroundColor: "gray",
    transition: "background-color 0.3s",
  },
  botones: {
    display: "flex",
    gap: "10px",
  },
  boton: {
    padding: "0.5rem 1rem",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
  },
  auto: {
    padding: "0.5rem 1rem",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
