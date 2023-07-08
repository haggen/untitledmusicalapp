import * as classes from "./style.module.css";

type Props = {
  label: string;
  state: "correct" | "incorrect";
  onSelect: () => void;
};

export function Option({ label, state, onSelect }: Props) {
  return (
    <button
      className={`${classes.option} ${classes[state]}`}
      onClick={onSelect}
      type="button"
    >
      {label}
    </button>
  );
}
