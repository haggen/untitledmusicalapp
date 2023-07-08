import { useState } from "react";

import * as classes from "./style.module.css";

import { Scoreboard } from "~/src/components/Scoreboard";
import { Quiz } from "~/src/components/Quiz";
import { Controls } from "~/src/components/Controls";
import { Accidental, Pitch, play } from "~/src/lib/synthesizer";

export type TOption = {
  label: string;
  value: number;
};

function calculateAccuracy(correct: number, incorrect: number) {
  if (correct <= 0 || incorrect <= 0) {
    return 0;
  }
  return Math.round((correct / (correct + incorrect)) * 100);
}

const availablePitches = [
  Pitch.A,
  Pitch.B,
  Pitch.C,
  Pitch.D,
  Pitch.E,
  Pitch.F,
  Pitch.G,
];

const availableOctaves = [2, 3, 4];

const availableOptions: TOption[] = [
  { label: "Minor 2nd", value: 1 },
  { label: "Major 2nd", value: 2 },
  { label: "Minor 3rd", value: 3 },
  { label: "Major 3rd", value: 4 },
  { label: "Perfect 4th", value: 5 },
  { label: "Tritone", value: 6 },
  { label: "Perfect 5th", value: 7 },
  { label: "Minor 6th", value: 8 },
  { label: "Major 6th", value: 9 },
  { label: "Minor 7th", value: 10 },
  { label: "Major 7th", value: 11 },
  { label: "Octave", value: 12 },
];

function drawRandomOption(options: TOption[]) {
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}

function drawRandomNote() {
  const pitchIndex = Math.floor(Math.random() * availablePitches.length);
  const octaveIndex = Math.floor(Math.random() * availableOctaves.length);

  return {
    pitch: availablePitches[pitchIndex],
    octave: availableOctaves[octaveIndex],
  };
}

export function App() {
  const [round, setRound] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<TOption[]>([]);

  const [{ correct, incorrect }, setScoreboard] = useState({
    correct: 0,
    incorrect: 0,
  });

  const displayedOptions = [
    availableOptions[3],
    availableOptions[6],
    availableOptions[11],
  ];

  const [referenceNote, setReferenceNote] = useState(drawRandomNote());
  const [correctOption, setCorrectOption] = useState(
    drawRandomOption(displayedOptions)
  );
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
      correctOption.value
    );
  };

  const handleSelect = (selectedOption: TOption) => {
    const isOptionCorrect = correctOption === selectedOption;

    setSelectedOptions((previousSelectedOptions) =>
      previousSelectedOptions.concat([selectedOption])
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
    setCorrectOption(drawRandomOption(displayedOptions));
    setReferenceNote(drawRandomNote());
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
          options={displayedOptions}
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
      <footer className="footer">
        {/* prettier-ignore */}
        <p>Made by <a href="https://github.com/haggen/" aria-label="Arthur Corenzan">me</a> and <a href="https://github.com/mtscarvalho" aria-label="Matheus Carvalho">me</a>. Source on GitHub.</p>
      </footer>
    </>
  );
}
