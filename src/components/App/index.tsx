import { useReducer } from "react";

import * as classes from "./style.module.css";

import { Scoreboard } from "~/src/components/Scoreboard";
import { Quiz } from "~/src/components/Quiz";
import { Controls } from "~/src/components/Controls";
import { Accidental, Note, play } from "~/src/lib/synthesizer";
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

type State = {
  round: number;
  scoreboard: {
    correct: number;
    incorrect: number;
  };
  correctOption: TOption;
  selectedOptions: TOption[];
  referenceNote: Pick<Note, "pitch" | "octave">;
  isRoundOver: boolean;
};

type Action =
  | { type: "new round" }
  | {
      type: "select option";
      payload: TOption;
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "new round":
      return {
        round: state.round + 1,
        scoreboard: state.scoreboard,
        selectedOptions: [],
        referenceNote: getRandomNote(),
        correctOption: getRandomOption(options),
        isRoundOver: false,
      };
    case "select option": {
      const selectedOptions = [...state.selectedOptions, action.payload];
      const isFirstAttempt = state.selectedOptions.length === 0;
      const isCorrect = state.correctOption === action.payload;
      const scoreboard = { ...state.scoreboard };

      if (isFirstAttempt) {
        if (isCorrect) {
          scoreboard.correct += 1;
        } else {
          scoreboard.incorrect += 1;
        }
      }

      return {
        ...state,
        selectedOptions,
        scoreboard,
        isRoundOver: selectedOptions.includes(state.correctOption),
      };
    }
    default:
      return state;
  }
}

function getInitialState() {
  return {
    round: 1,
    scoreboard: { correct: 0, incorrect: 0 },
    selectedOptions: [],
    referenceNote: getRandomNote(),
    correctOption: getRandomOption(options),
    isRoundOver: false,
  } as State;
}

export function App() {
  const [
    {
      round,
      scoreboard: { correct, incorrect },
      selectedOptions,
      referenceNote,
      correctOption,
      isRoundOver,
    },
    dispatch,
  ] = useReducer(reducer, getInitialState());

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
    dispatch({ type: "select option", payload: selectedOption });
  };

  const handleNewRound = () => {
    dispatch({ type: "new round" });
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
