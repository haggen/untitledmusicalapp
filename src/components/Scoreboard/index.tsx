import * as classes from './style.module.css';

import { Score } from '~/src/components/Score';

type Props = {
  scoreboard: {
    correct: number;
    incorrect: number;
    accuracy: () => number;
  };
};

export function Scoreboard({ scoreboard }: Props) {
  return (
    <div className={classes.scoreboard}>
      <Score label="correct" value={scoreboard.correct} />
      <Score label="failed" value={scoreboard.incorrect} />
      <Score label="accuracy" value={scoreboard.accuracy()} />
    </div>
  );
}
