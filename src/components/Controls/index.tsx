import * as classes from './style.module.css';

type Props = {
  isRoundOver: boolean | null;
  onHearInterval: () => void;
  onNextRound: () => void;
};

export function Controls({ isRoundOver, onHearInterval, onNextRound }: Props) {
  return (
    <div className={classes.controls}>
      <button className={classes.button} type="button" onClick={onHearInterval}>
        Hear the interval
      </button>
      {isRoundOver ? (
        <button className={classes.button} type="button" onClick={onNextRound}>
          Next
        </button>
      ) : null}
    </div>
  );
}
