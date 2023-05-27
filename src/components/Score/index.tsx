import * as classes from "./style.module.css";

type Props = {
  label: string;
  value: string;
};

export function Score({ label, value }: Props) {
  return (
    <dl className={classes.score}>
      <dt className={classes.label}>{label}</dt>
      <dd className={classes.value}>{value}</dd>
    </dl>
  );
}
