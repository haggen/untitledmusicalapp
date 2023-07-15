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
  detunePeak: number;
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
 * Interval in semitones.
 * @see https://en.wikipedia.org/wiki/Interval_(music)
 */
export enum Interval {
  Unison = 0,
  MinorSecond = 1,
  MajorSecond = 2,
  MinorThird = 3,
  MajorThird = 4,
  PerfectFourth = 5,
  Tritone = 6,
  PerfectFifth = 7,
  MinorSixth = 8,
  MajorSixth = 9,
  MinorSeventh = 10,
  MajorSeventh = 11,
  Octave = 12,
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
  return A4.frequency * Math.pow(R, getSemitonesBetween(A4, note));
}

/**
 * Synthesize sound.
 */
function synthesize(parameters: Synthesis) {
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }

  const oscillatorNode = new OscillatorNode(audioContext, {
    frequency: parameters.frequency,
    type: parameters.type,
  });

  if (parameters.detunePeak > 0) {
    oscillatorNode.detune.setValueCurveAtTime(
      Array(parameters.length / 0.05)
        .fill(parameters.detunePeak)
        .map((n, i) => Math.random() * n * (i % 2 === 0 ? -1 : 1)),
      parameters.startTime,
      parameters.length,
    );
  }

  const gainNode = new GainNode(audioContext);

  gainNode.gain.setValueAtTime(0, parameters.startTime);
  gainNode.gain.linearRampToValueAtTime(
    parameters.peakGain,
    parameters.startTime + parameters.attack,
  );
  gainNode.gain.setValueAtTime(
    parameters.peakGain,
    parameters.startTime + parameters.length - parameters.release,
  );
  gainNode.gain.linearRampToValueAtTime(
    0,
    parameters.startTime + parameters.length,
  );

  oscillatorNode.connect(gainNode).connect(audioContext.destination);

  oscillatorNode.start(parameters.startTime);
  oscillatorNode.stop(parameters.startTime + parameters.length);
}

/**
 * Play a playable and return the ending time.
 */
export function play(
  playable: Playable | (Playable & Note),
  interval: Interval = 0,
) {
  const { startTime = audioContext.currentTime, length } = playable;

  if ("pitch" in playable) {
    const { pitch, octave, accidental = Accidental.Natural } = playable;

    synthesize({
      frequency: getFrequency({
        octave,
        pitch,
        accidental: accidental + interval,
      }),
      type: "square",
      startTime,
      length,
      peakGain: 1,
      attack: 0.05,
      release: 0.05,
      detunePeak: 20,
    });
  }

  return startTime + length;
}
