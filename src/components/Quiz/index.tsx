import * as classes from './style.module.css';

import { Answer } from '~/src/components/Answer';

type Props = {
  possibleAnswers: {
    id: number;
    label: string;
    isCorrect: boolean;
  }[];
  setIsAnsweredCorrectly: (isAnsweredCorrectly: boolean) => void;
};

export function Quiz({ possibleAnswers, setIsAnsweredCorrectly }: Props) {
  return (
    <div className={classes.quiz}>
      <div className={classes.question}>
        <p className={classes.label}>Round 1</p>
        <h1 className={classes.title}>What's this interval?</h1>
      </div>
      <div className={classes.options}>
        {possibleAnswers.map((answer) => (
          <Answer key={answer.id} label={answer.label} isCorrect={answer.isCorrect} setIsAnsweredCorrectly={setIsAnsweredCorrectly} />
        ))}
      </div>
    </div>
  );
}
