import { useReducer } from "react";

import * as classes from "./style.module.css";

import { Scoreboard } from "~/src/components/Scoreboard";
import { Quiz } from "~/src/components/Quiz";
import { Controls } from "~/src/components/Controls";
import { Accidental, Note, play } from "~/src/lib/synthesizer";
import { getOption, getRandomNote, getRandomOptionId } from "~/src/lib/data";

function calculateAccuracy(correct: number, incorrect: number) {
  if (correct <= 0 || incorrect <= 0) {
    return 0;
  }
  return Math.round((correct / (correct + incorrect)) * 100);
}

const optionIds = [
  getOption("Major 3rd").id,
  getOption("Perfect 5th").id,
  getOption("Octave").id,
];

type State = {
  round: number;
  scoreboard: {
    correct: number;
    incorrect: number;
  };
  correctOptionId: number;
  selectedOptionIds: number[];
  referenceNote: Pick<Note, "pitch" | "octave">;
  isRoundOver: boolean;
};

type Action =
  | { type: "new round" }
  | {
      type: "select option";
      payload: number;
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "new round":
      return {
        round: state.round + 1,
        scoreboard: state.scoreboard,
        selectedOptionIds: [],
        referenceNote: getRandomNote(),
        correctOptionId: getRandomOptionId(optionIds),
        isRoundOver: false,
      };
    case "select option": {
      const selectedOptionIds = [...state.selectedOptionIds, action.payload];
      const isFirstAttempt = state.selectedOptionIds.length === 0;
      const isCorrect = state.correctOptionId === action.payload;
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
        selectedOptionIds,
        scoreboard,
        isRoundOver: selectedOptionIds.includes(state.correctOptionId),
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
    selectedOptionIds: [],
    referenceNote: getRandomNote(),
    correctOptionId: getRandomOptionId(optionIds),
    isRoundOver: false,
  } as State;
}

export function App() {
  const [
    {
      round,
      scoreboard: { correct, incorrect },
      selectedOptionIds,
      referenceNote,
      correctOptionId,
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
      getOption(correctOptionId).interval,
    );
  };

  const handleSelect = (selectedOptionId: number) => {
    dispatch({ type: "select option", payload: selectedOptionId });
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
          optionIds={optionIds}
          selectedOptionIds={selectedOptionIds}
          correctOptionId={correctOptionId}
          onSelectOption={handleSelect}
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
