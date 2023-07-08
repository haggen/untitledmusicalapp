import * as classes from "./style.module.css";

import { Score } from "~/src/components/Score";

type Props = {
  correct: number;
  incorrect: number;
  accuracy: number;
};

export function Scoreboard({ correct, incorrect, accuracy }: Props) {
  return (
    <div className={classes.scoreboard}>
      <Score label="Correct">{correct}</Score>
      <Score label="Wrong">{incorrect}</Score>
      <Score label="Accuracy">{accuracy}%</Score>
    </div>
  );
}
