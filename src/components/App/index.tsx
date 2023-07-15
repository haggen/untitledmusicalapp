import { useState } from "react";

import * as classes from "./style.module.css";

import { Scoreboard } from "~/src/components/Scoreboard";
import { Quiz } from "~/src/components/Quiz";
import { Controls } from "~/src/components/Controls";
import { Accidental, play } from "~/src/lib/synthesizer";
import {
  TOption,
  getOption,
  getRandomNote,
  getRandomOption,
} from "~/src/lib/data";

function calculateAccuracy(correct: number, incorrect: number) {
  if (correct <= 0 || incorrect <= 0) {
    return 0;
  }
  return Math.round((correct / (correct + incorrect)) * 100);
}

const options = [
  getOption("Major 3rd"),
  getOption("Perfect 5th"),
  getOption("Octave"),
];

export function App() {
  const [round, setRound] = useState(1);
  const [{ correct, incorrect }, setScoreboard] = useState({
    correct: 0,
    incorrect: 0,
  });
  const [selectedOptions, setSelectedOptions] = useState<TOption[]>([]);
  const [referenceNote, setReferenceNote] = useState(getRandomNote());
  const [correctOption, setCorrectOption] = useState(getRandomOption(options));
  const isFirstAttempt = Object.keys(selectedOptions).length === 0;
  const isRoundOver = Object.values(selectedOptions).includes(correctOption);

  const handleHear = () => {
    let n = play({
      pitch: referenceNote.pitch,
      octave: referenceNote.octave,
      accidental: Accidental.Natural,
      length: 0.5,
    });

    n = play({ length: 0.5, startTime: n });

    play(
      {
        pitch: referenceNote.pitch,
        octave: referenceNote.octave,
        accidental: Accidental.Natural,
        length: 0.5,
        startTime: n,
      },
      correctOption.interval,
    );
  };

  const handleSelect = (selectedOption: TOption) => {
    const isOptionCorrect = correctOption === selectedOption;

    setSelectedOptions((previousSelectedOptions) =>
      previousSelectedOptions.concat([selectedOption]),
    );

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
    setSelectedOptions([]);
    setCorrectOption(getRandomOption(options));
    setReferenceNote(getRandomNote());
  };

  return (
    <div className={classes.layout}>
      <header className={classes.header}>
        <Scoreboard
          correct={correct}
          incorrect={incorrect}
          accuracy={calculateAccuracy(correct, incorrect)}
        />
      </header>
      <main className={classes.main}>
        <Quiz
          round={round}
          options={options}
          selectedOptions={selectedOptions}
          correctOption={correctOption}
          onOptionSelect={handleSelect}
        />
        <Controls
          isRoundOver={isRoundOver}
          onHearInterval={handleHear}
          onNextRound={handleNewRound}
        />
      </main>
      <footer className={classes.footer}>
        {/* prettier-ignore */}
        <p>Made by <a href="https://github.com/haggen/" aria-label="Arthur Corenzan">me</a> and <a href="https://github.com/mtscarvalho" aria-label="Matheus Carvalho">me</a>. Source on GitHub.</p>
      </footer>
    </div>
  );
}
