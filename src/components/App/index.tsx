import { useState } from "react";

import { Scoreboard } from "~/src/components/Scoreboard";
import { Quiz } from "~/src/components/Quiz";
import { Controls } from "~/src/components/Controls";
import { Accidental, Pitch, play } from "~/src/lib/synthesizer";

function calculateAccuracy(correct: number, incorrect: number) {
  if (correct <= 0 || incorrect <= 0) {
    return 0;
  }
  return Math.round((correct / (correct + incorrect)) * 100);
}

function getCorrectOptionId(
  array: { id: number; label: string; isCorrect: boolean }[]
) {
  return array.find((option) => option.isCorrect)?.id ?? null;
}

export function App() {
  const [round, setRound] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: "correct" | "incorrect";
  }>({});

  const [{ correct, incorrect }, setScoreboard] = useState({
    correct: 0,
    incorrect: 0,
  });

  const options = [
    { id: 0, label: "Minor 2nd", isCorrect: false },
    { id: 1, label: "Perfect 5th", isCorrect: true },
    { id: 2, label: "Octave", isCorrect: false },
  ];

  const correctOption = getCorrectOptionId(options) ?? null;
  const isFirstAttempt = Object.keys(selectedOptions).length === 0;
  const isRoundOver = Object.values(selectedOptions).includes("correct");

  const handleHear = () => {
    let n = play({
      pitch: Pitch.A,
      octave: 3,
      accidental: Accidental.Natural,
      length: 0.5,
    });

    n = play({ length: 0.5, startTime: n });

    play({
      pitch: Pitch.E,
      octave: 4,
      accidental: Accidental.Natural,
      length: 0.5,
      startTime: n,
    });
  };

  const handleSelect = (optionId: number) => {
    const isOptionCorrect = correctOption === optionId;

    setSelectedOptions((previousSelectedOptions) => ({
      ...previousSelectedOptions,
      [optionId]: isOptionCorrect ? "correct" : "incorrect",
    }));

    if (isFirstAttempt) {
      if (isOptionCorrect) {
        setScoreboard((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setScoreboard((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      }
    }
  };

  const handleNewRound = () => {
    setRound((prev) => prev + 1);
    setSelectedOptions({});
  };

  return (
    <>
      <header className="header">
        <Scoreboard
          correct={correct}
          incorrect={incorrect}
          accuracy={calculateAccuracy(correct, incorrect)}
        />
      </header>
      <main className="main">
        <Quiz
          round={round}
          options={options}
          selectedOptions={selectedOptions}
          onSelectOption={handleSelect}
        />
        <Controls
          isRoundOver={isRoundOver}
          onHearInterval={handleHear}
          onNextRound={handleNewRound}
        />
      </main>
      <footer className="footer">
        {/* prettier-ignore */}
        <p>Made by <a href="https://github.com/haggen/" aria-label="Arthur Corenzan">me</a> and <a href="https://github.com/mtscarvalho" aria-label="Matheus Carvalho">me</a>. Source on GitHub.</p>
      </footer>
    </>
  );
}
