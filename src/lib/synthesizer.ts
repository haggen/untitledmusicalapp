/**
 * Pitch classes and their respective offset from the reference pitch (A) in semitones.
 * @see https://en.wikipedia.org/wiki/Pitch_(music)
 */
export enum Pitch {
  C = -9,
  D = -7,
  E = -5,
  F = -4,
  G = -2,
  A = 0,
  B = 2,
}

/**
 * Accidentals and their respective offset in semitones.
 * @see https://en.wikipedia.org/wiki/Accidental_(music)
 */
export enum Accidental {
  Flat = -1,
  Natural = 0,
  Sharp = 1,
}

/**
 * A note specification.
 */
type Note = {
  octave: number;
  pitch: Pitch;
  accidental: Accidental;
};

/**
 * A "Playable" is something that has a start time and a duration.
 */
type Playable = {
  currentTime?: number;
  length: number;
};

/**
 * Global audio context.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 */
const audioContext = new AudioContext();

/**
 * The twelfth root of two.
 * @see https://en.wikipedia.org/wiki/Equal_temperament
 */
const R = 1.059463094359;

/**
 * The reference note: A4 (A above middle C).
 */
const A4 = {
  octave: 4,
  pitch: Pitch.A,
  accidental: Accidental.Natural,
  frequency: 440,
};

/**
 * Calculate semitones between two notes.
 */
function getSemitonesBetween(a: Note, b: Note) {
  return (
    (a.octave - b.octave) * 12 +
    (a.accidental + b.accidental) +
    (a.pitch + b.pitch)
  );
}

/**
 * Calculate frequency of a note in hertz.
 */
function getFrequency(note: Note) {
  return A4.frequency * Math.pow(R, getSemitonesBetween(note, A4));
}

/**
 * Play a playable and return the ending time.
 */
export async function play(playable: Playable | (Playable & Note)) {
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  const { currentTime = audioContext.currentTime, length } = playable;

  if ("pitch" in playable) {
    const { pitch, octave, accidental = Accidental.Natural } = playable;

    const oscillatorNode = new OscillatorNode(audioContext, {
      frequency: getFrequency({ octave, pitch, accidental }),
      type: "sine",
    });

    console.log({
      octave,
      pitch,
      accidental,
      frequency: oscillatorNode.frequency.value,
    });

    const gainNode = new GainNode(audioContext);

    // Attack and release for 10% of the note's length.
    gainNode.gain.setValueCurveAtTime(
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      currentTime,
      length
    );

    oscillatorNode.connect(gainNode).connect(audioContext.destination);

    oscillatorNode.start(currentTime);
    oscillatorNode.stop(currentTime + length);
  }

  return currentTime + length;
}
