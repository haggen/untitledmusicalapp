import { Scoreboard } from "~/src/components/Scoreboard";
import { Quiz } from "~/src/components/Quiz";
import { Controls } from "~/src/components/Controls";
import { Accidental, Pitch, play } from "~/src/lib/synthesizer";

export function App() {
  const handleClick = async () => {
    let n = await play({
      pitch: Pitch.A,
      octave: 3,
      accidental: Accidental.Natural,
      length: 0.5,
    });

    n = await play({ length: 0.5, currentTime: n });

    void play({
      pitch: Pitch.E,
      octave: 4,
      accidental: Accidental.Natural,
      length: 0.5,
      currentTime: n,
    });
  };

  return (
    <>
      <header className="header">
        <Scoreboard />
      </header>
      <main className="main">
        <Quiz />
        <Controls />
      </main>
      <footer className="footer">
        {/* prettier-ignore */}
        <p>Made by <a href="https://github.com/haggen/" aria-label="Arthur Corenzan">me</a> and <a href="https://github.com/mtscarvalho" aria-label="Matheus Carvalho">me</a>. Source on GitHub.</p>
        <button onClick={handleClick}>Play 🎵</button>
      </footer>
    </>
  );
}
