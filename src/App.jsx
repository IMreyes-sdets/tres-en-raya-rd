import { useState, useEffect } from "react";

const STORAGE_KEY = "tictactoe-rd-estado";

// Combinaciones ganadoras del tablero 3x3 (índices 0 a 8)
const LINEAS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
  [0, 4, 8], [2, 4, 6],            // diagonales
];

const NOMBRES = {
  X: "Taíno 🏹",
  O: "Caribe 🛶",
};

function calcularGanador(tablero) {
  for (const [a, b, c] of LINEAS) {
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return { jugador: tablero[a], linea: [a, b, c] };
    }
  }
  return null;
}

// Lee el estado guardado en localStorage; si no existe o está dañado, empieza de cero
function estadoInicial() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (guardado && Array.isArray(guardado.tablero) && guardado.tablero.length === 9) {
      return guardado;
    }
  } catch {
    // JSON inválido: se ignora
  }
  return { tablero: Array(9).fill(null), turnoX: true };
}

export default function App() {
  const [estado, setEstado] = useState(estadoInicial);
  const { tablero, turnoX } = estado;

  const ganador = calcularGanador(tablero);
  const empate = !ganador && tablero.every(Boolean);
  const terminado = Boolean(ganador || empate);

  // Guarda la partida en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  }, [estado]);

  function jugar(i) {
    if (tablero[i] || terminado) return;
    const nuevoTablero = [...tablero];
    nuevoTablero[i] = turnoX ? "X" : "O";
    setEstado({ tablero: nuevoTablero, turnoX: !turnoX });
  }

  function reiniciar() {
    setEstado({ tablero: Array(9).fill(null), turnoX: true });
  }

  let mensaje;
  if (ganador) {
    mensaje = `🎉 ¡Ganó ${NOMBRES[ganador.jugador]}! ¡Qué jugada, compa!`;
  } else if (empate) {
    mensaje = "🤝 ¡Empate! Ni Taíno ni Caribe logran ganar.";
  } else {
    mensaje = `Turno de ${NOMBRES[turnoX ? "X" : "O"]}`;
  }

  return (
    <div className="pagina">
      <header>
        <h1>Tres en Raya</h1>
        <p className="subtitulo">Taíno vs Caribe · Quisqueya 🇩🇴</p>
      </header>

      <p className={`mensaje ${terminado ? "final" : ""}`}>{mensaje}</p>

      <div className="tablero">
        {tablero.map((celda, i) => {
          const esGanadora = ganador?.linea.includes(i);
          return (
            <button
              key={i}
              className={`celda ${celda ? `celda-${celda.toLowerCase()}` : ""} ${
                esGanadora ? "ganadora" : ""
              }`}
              onClick={() => jugar(i)}
              disabled={Boolean(celda) || terminado}
              aria-label={`Casilla ${i + 1}${celda ? `: ${celda}` : ""}`}
            >
              {celda}
            </button>
          );
        })}
      </div>

      <button className="reiniciar" onClick={reiniciar}>
        Reiniciar partida
      </button>

      <footer>
        <span className="franja azul" />
        <span className="franja blanca" />
        <span className="franja roja" />
      </footer>
    </div>
  );
}
