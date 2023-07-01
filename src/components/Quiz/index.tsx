import { useState, useEffect } from 'react';

import * as classes from './style.module.css';

import { Option } from '~/src/components/Option';

type Props = {
  round: number;
  options: {
    id: number;
    label: string;
    isCorrect: boolean;
  }[];
  correctOption: number | null;
  isAnswered: boolean;
  setIsAnswered: (isAnswered: boolean) => void;
  setIsAnsweredCorrectly: (isAnsweredCorrectly: boolean) => void;
  setIsRoundOver: (isCorrect: boolean) => void;
};

export function Quiz({ round, options, correctOption, isAnswered, setIsAnswered, setIsAnsweredCorrectly, setIsRoundOver }: Props) {
  const [optionsState, setOptionsState] = useState<{ [key: number]: 'correct' | 'incorrect' }>({});

  const handleSelect = (optionId: number) => {
    const isOptionCorrect = correctOption === optionId;

    setOptionsState((previousState) => ({
      ...previousState,
      [optionId]: isOptionCorrect ? 'correct' : 'incorrect',
    }));

    // Set isAnswered to true when the user selects an option.
    setIsAnswered(true);

    // Set anwseredCorrectly to true if the first attempt is correct.
    if (isOptionCorrect && !isAnswered) {
      setIsAnsweredCorrectly(true);
    }

    // Set isRoundOver to true when the user selects the correct option.
    if (isOptionCorrect && (isAnswered || !isAnswered)) {
      setIsRoundOver(true);
    }
  };

  useEffect(() => {
    setOptionsState({});
  }, [round]);

  return (
    <div className={classes.quiz}>
      <div className={classes.question}>
        <p className={classes.label}>Round {round}</p>
        <h1 className={classes.title}>What's this interval?</h1>
      </div>
      <div className={classes.options}>
        {options.map(({ id, label }) => (
          <Option key={id} label={label} state={optionsState[id]} onSelect={() => handleSelect(id)} />
        ))}
      </div>
    </div>
  );
}
