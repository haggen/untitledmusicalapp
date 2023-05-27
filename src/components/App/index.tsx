import { Scoreboard } from "~/src/components/Scoreboard";
import { Quiz } from "~/src/components/Quiz";
import { Controls } from "~/src/components/Controls";
import { playSweep } from "~/src/lib/synthesizer";

export function App() {
  const handleClick = () => {
    playSweep();
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
