import { useState } from 'react';

import * as classes from './style.module.css';

type Props = {
  label: string;
  isCorrect: boolean;
  setIsAnsweredCorrectly: (isCorrect: boolean) => void;
};

export function Answer({ label, isCorrect, setIsAnsweredCorrectly }: Props) {
  const [state, setState] = useState('unanswered');

  const handleAnswerClick = () => {
    setState(isCorrect ? 'correct' : 'incorrect');
    isCorrect && setIsAnsweredCorrectly(true);
  };

  return (
    <button className={`${classes.answer} ${classes[state]}`} onClick={handleAnswerClick} type="button">
      {label}
    </button>
  );
}
