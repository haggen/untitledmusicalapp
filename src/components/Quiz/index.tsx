import * as classes from "./style.module.css";

import { Option } from "~/src/components/Option";
import { getOptionState } from "~/src/components/Option/shared";

type Props = {
  round: number;
  optionIds: number[];
  selectedOptionIds: number[];
  correctOptionId: number;
  onSelectOption: (id: number) => void;
};

export function Quiz({
  round,
  optionIds: optionIds,
  selectedOptionIds,
  correctOptionId,
  onSelectOption,
}: Props) {
  return (
    <div className={classes.quiz}>
      <div className={classes.question}>
        <p className={classes.label}>Round {round}</p>
        <h1 className={classes.title}>What's this interval?</h1>
      </div>
      <div className={classes.options}>
        {optionIds.map((id) => (
          <Option
            key={id}
            id={id}
            state={getOptionState(id, correctOptionId, selectedOptionIds)}
            onSelect={() => onSelectOption(id)}
          />
        ))}
      </div>
    </div>
  );
}
