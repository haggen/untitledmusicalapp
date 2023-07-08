import * as classes from "./style.module.css";

import { TOption } from "~/src/components/App";
import { Option } from "~/src/components/Option";
import { getOptionState } from "~/src/components/Option/shared";

type Props = {
  round: number;
  options: TOption[];
  selectedOptions: TOption[];
  correctOption: TOption;
  onOptionSelect: (option: TOption) => void;
};

export function Quiz({
  round,
  options,
  selectedOptions,
  correctOption,
  onOptionSelect: onSelectOption,
}: Props) {
  return (
    <div className={classes.quiz}>
      <div className={classes.question}>
        <p className={classes.label}>Round {round}</p>
        <h1 className={classes.title}>What's this interval?</h1>
      </div>
      <div className={classes.options}>
        {options.map((option) => (
          <Option
            key={option.label}
            label={option.label}
            state={getOptionState(option, correctOption, selectedOptions)}
            onSelect={() => onSelectOption(option)}
          />
        ))}
      </div>
    </div>
  );
}
