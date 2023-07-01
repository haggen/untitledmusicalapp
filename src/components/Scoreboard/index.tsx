import * as classes from './style.module.css';

import { Score } from '~/src/components/Score';

type Props = {
  correct: number;
  incorrect: number;
  accuracy: number;
};

export function Scoreboard({ correct, incorrect, accuracy }: Props) {
  return (
    <div className={classes.scoreboard}>
      <Score label="correct">{correct}</Score>
      <Score label="failed">{incorrect}</Score>
      <Score label="accuracy">{accuracy}%</Score>
    </div>
  );
}
