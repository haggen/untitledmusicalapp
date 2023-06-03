/**
 * Sound synthesis parameters.
 */
type Synthesis = {
  frequency: number;
  type: OscillatorType;
  startTime: number;
  length: number;
  peakGain: number;
  attack: number;
  release: number;
};

/**
 * Pitch classes and their respective offset inside an octave in semitones.
 * @see https://en.wikipedia.org/wiki/Pitch_(music)
 */
export enum Pitch {
  C = 0,
  D = 2,
  E = 3,
  F = 5,
  G = 7,
  A = 8,
  B = 10,
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
  startTime?: number;
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
 * Our reference note with known frequency: A4 (A above middle C).
 */
const A4 = {
  octave: 4,
  pitch: Pitch.A,
  accidental: Accidental.Natural,
  frequency: 440,
};

/**
 * Calculate difference in semitones from note A to B.
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
 * Synthesize sound.
 */
function synthesize(parameters: Synthesis) {
  const oscillatorNode = new OscillatorNode(audioContext, {
    frequency: parameters.frequency,
    type: parameters.type,
  });

  // Small tremolo effect to make it sound less digital.
  const tremoloInterval = 0.05;
  const tremoloMagnitude = 20;

  oscillatorNode.detune.setValueCurveAtTime(
    Array(parameters.length / tremoloInterval)
      .fill(tremoloMagnitude)
      .map((n, i) => (10 + Math.random() * n) * (i % 2 === 0 ? -1 : 1)),
    parameters.startTime,
    parameters.length
  );

  const gainNode = new GainNode(audioContext);

  gainNode.gain.setValueAtTime(0, parameters.startTime);
  gainNode.gain.linearRampToValueAtTime(
    parameters.peakGain,
    parameters.startTime + parameters.attack
  );
  gainNode.gain.setValueAtTime(
    parameters.peakGain,
    parameters.startTime + parameters.length - parameters.release
  );
  gainNode.gain.linearRampToValueAtTime(
    0,
    parameters.startTime + parameters.length
  );

  oscillatorNode.connect(gainNode).connect(audioContext.destination);

  oscillatorNode.start(parameters.startTime);
  oscillatorNode.stop(parameters.startTime + parameters.length);
}

/**
 * Play a playable and return the ending time.
 */
export async function play(playable: Playable | (Playable & Note)) {
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  const { startTime = audioContext.currentTime, length } = playable;

  if ("pitch" in playable) {
    const { pitch, octave, accidental = Accidental.Natural } = playable;

    synthesize({
      frequency: getFrequency({ octave, pitch, accidental }),
      type: "sine",
      startTime,
      length,
      peakGain: 1,
      attack: 0.05,
      release: 0.05,
    });
  }

  return startTime + length;
}
