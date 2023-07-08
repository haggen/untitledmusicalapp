import { Pitch } from "~/src/lib/synthesizer";

export type TOption = {
  label: string;
  interval: number;
};

const pool = {
  pitches: [Pitch.A, Pitch.B, Pitch.C, Pitch.D, Pitch.E, Pitch.F, Pitch.G],
  octaves: [2, 3, 4],
  options: [
    { label: "Minor 2nd", interval: 1 },
    { label: "Major 2nd", interval: 2 },
    { label: "Minor 3rd", interval: 3 },
    { label: "Major 3rd", interval: 4 },
    { label: "Perfect 4th", interval: 5 },
    { label: "Tritone", interval: 6 },
    { label: "Perfect 5th", interval: 7 },
    { label: "Minor 6th", interval: 8 },
    { label: "Major 6th", interval: 9 },
    { label: "Minor 7th", interval: 10 },
    { label: "Major 7th", interval: 11 },
    { label: "Octave", interval: 12 },
  ],
};

function getRandomItem<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomOption(options: TOption[] = pool.options) {
  return getRandomItem(options);
}

export function getRandomNote() {
  return {
    pitch: getRandomItem(pool.pitches),
    octave: getRandomItem(pool.octaves),
  };
}

export function getOption(label: string) {
  const option = pool.options.find((option) => option.label === label);
  if (!option) {
    throw new Error(`Option with label ${label} not found`);
  }
  return option;
}
