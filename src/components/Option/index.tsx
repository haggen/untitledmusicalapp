import * as classes from "./style.module.css";

import { getOption } from "~/src/lib/data";

type Props = {
  id: number;
  state: "correct" | "incorrect" | "unselected";
  onSelect: () => void;
};

export function Option({ id, state, onSelect }: Props) {
  return (
    <button
      className={`${classes.option} ${classes[state]}`}
      onClick={onSelect}
      type="button"
    >
      {getOption(id).label}
    </button>
  );
}
