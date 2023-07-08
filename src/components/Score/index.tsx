import { ReactNode } from "react";

import * as classes from "./style.module.css";

type Props = {
  label: string;
  children: ReactNode;
};

export function Score({ label, children }: Props) {
  return (
    <dl className={classes.score}>
      <dt className={classes.label}>{label}</dt>
      <dd className={classes.value}>{children}</dd>
    </dl>
  );
}
