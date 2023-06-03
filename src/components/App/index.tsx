import { useState } from 'react';

import { Scoreboard } from '~/src/components/Scoreboard';
import { Quiz } from '~/src/components/Quiz';
import { Controls } from '~/src/components/Controls';
import { Accidental, Pitch, play } from '~/src/lib/synthesizer';

export function App() {
  const scoreboard = {
    correct: 10,
    incorrect: 4,
    accuracy: () => Math.round((scoreboard.correct / (scoreboard.correct + scoreboard.incorrect)) * 1000) / 10,
  };

  const possibleAnswers = [
    {
      id: 1,
      label: 'Minor 2nd',
      isCorrect: false,
    },
    {
      id: 2,
      label: 'Perfect 5th',
      isCorrect: true,
    },
    {
      id: 3,
      label: 'Octave',
      isCorrect: false,
    },
  ];

  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);

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

  const handleNext = () => {
    return;
  };

  return (
    <>
      <header className="header">
        <Scoreboard scoreboard={scoreboard} />
      </header>
      <main className="main">
        <Quiz possibleAnswers={possibleAnswers} setIsAnsweredCorrectly={setIsAnsweredCorrectly} />
        <Controls isAnsweredCorrectly={isAnsweredCorrectly} onHearInterval={handleClick} onNext={handleNext} />
      </main>
      <footer className="footer">
        {/* prettier-ignore */}
        <p>Made by <a href="https://github.com/haggen/" aria-label="Arthur Corenzan">me</a> and <a href="https://github.com/mtscarvalho" aria-label="Matheus Carvalho">me</a>. Source on GitHub.</p>
      </footer>
    </>
  );
}
