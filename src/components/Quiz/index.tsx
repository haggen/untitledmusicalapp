import * as classes from './style.module.css';

import { Option } from '~/src/components/Option';

type Props = {
  round: number;
  options: {
    id: number;
    label: string;
    isCorrect: boolean;
  }[];
  selectedOptions: { [key: number]: 'correct' | 'incorrect' };
  onSelect: (optionId: number) => void;
};

export function Quiz({ round, options, selectedOptions, onSelect }: Props) {
  return (
    <div className={classes.quiz}>
      <div className={classes.question}>
        <p className={classes.label}>Round {round}</p>
        <h1 className={classes.title}>What's this interval?</h1>
      </div>
      <div className={classes.options}>
        {options.map(({ id, label }) => (
          <Option key={id} label={label} state={selectedOptions[id]} onSelect={() => onSelect(id)} />
        ))}
      </div>
    </div>
  );
}
