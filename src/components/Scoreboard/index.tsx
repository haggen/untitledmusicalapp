import * as classes from "./style.module.css";

import { Score } from "~/src/components/Score";

export function Scoreboard() {
  return (
    <div className={classes.scoreboard}>
      <Score label="correct" value="12" />
      <Score label="failed" value="6" />
      <Score label="accuracy" value="66%" />
    </div>
  );
}
