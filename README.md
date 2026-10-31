# Tres en Raya RD 🇩🇴

**Nombre completo:** Ismailyn Reyes

## Descripción del juego

Juego de tres en raya (tic-tac-toe) para dos jugadores en un mismo dispositivo. Los turnos se alternan entre **Taíno (X)** y **Caribe (O)**. El juego detecta cuando hay un ganador o un empate, muestra el resultado, y permite reiniciar la partida. El estado de la partida se guarda en `localStorage`, así que si recargas la página, el tablero se mantiene.

Los colores de la interfaz son los de la bandera dominicana (azul, blanco y rojo), con el fondo de cruz de la bandera.

## Componentes principales

- **Tablero 3x3**: 9 botones generados con `Array.map`.
- **`useState`**: guarda el tablero y de quién es el turno.
- **`calcularGanador`**: revisa las 8 combinaciones ganadoras (3 filas, 3 columnas, 2 diagonales).
- **`useEffect`**: guarda la partida en `localStorage` cada vez que cambia el estado.
- **Botón "Reiniciar partida"**: vuelve el estado a su valor inicial.

## Qué aprendí

- Manejar estado con `useState` y por qué no conviene mutar el arreglo directamente (se copia con `[...tablero]`).
- Usar `useEffect` para sincronizar el estado con un efecto externo (`localStorage`).
- Derivar valores (ganador, empate) a partir del estado en lugar de guardarlos por separado.
- Usar `localStorage` con validación, para que un dato dañado no rompa la aplicación.

## Qué parte fue más difícil
SUBIRLOOOO A la plataforma UASD Virtual. LOL

## Cómo ejecutar

```bash
npm install
npm run dev
```
