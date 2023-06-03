import * as classes from './style.module.css';

type Props = {
  isAnsweredCorrectly: boolean;
  onHearInterval: () => void;
  onNext: () => void;
};

export function Controls({ isAnsweredCorrectly, onHearInterval, onNext }: Props) {
  return (
    <div className={classes.controls}>
      <button className={classes.button} type="button" onClick={onHearInterval}>
        Hear the interval
      </button>
      {isAnsweredCorrectly && (
        <button className={classes.button} type="button" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  );
}
