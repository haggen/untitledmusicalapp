import * as classes from './style.module.css';

type Props = {
  isRoundOver: boolean | null;
  onHearInterval: () => void;
  onNext: () => void;
};

export function Controls({ isRoundOver, onHearInterval, onNext }: Props) {
  return (
    <div className={classes.controls}>
      <button className={classes.button} type="button" onClick={onHearInterval}>
        Hear the interval
      </button>
      {isRoundOver ? (
        <button className={classes.button} type="button" onClick={onNext}>
          Next
        </button>
      ) : null}
    </div>
  );
}
