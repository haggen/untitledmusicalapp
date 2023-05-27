import * as classes from "./style.module.css";

export function Quiz() {
  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <div className={classes.quiz}>
      <div className={classes.question}>
        <p className={classes.label}>Round 1</p>
        <h1 className={classes.title}>What's this interval?</h1>
      </div>
      <div className={classes.options}>
        <button className={classes.button} onClick={handleClick}>
          Major 3rd
        </button>
        <button className={classes.button} onClick={handleClick}>
          Perfect 5th
        </button>
        <button className={classes.button} onClick={handleClick}>
          Octave
        </button>
      </div>
    </div>
  );
}
