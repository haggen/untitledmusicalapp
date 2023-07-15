import { Pitch } from "~/src/lib/synthesizer";

export type TOption = {
  label: string;
  interval: number;
};

const pool = {
  pitches: [Pitch.A, Pitch.B, Pitch.C, Pitch.D, Pitch.E, Pitch.F, Pitch.G],
  octaves: [2, 3, 4],
  options: [
    { id: 0, label: "Minor 2nd", interval: 1 },
    { id: 1, label: "Major 2nd", interval: 2 },
    { id: 2, label: "Minor 3rd", interval: 3 },
    { id: 3, label: "Major 3rd", interval: 4 },
    { id: 4, label: "Perfect 4th", interval: 5 },
    { id: 5, label: "Tritone", interval: 6 },
    { id: 6, label: "Perfect 5th", interval: 7 },
    { id: 7, label: "Minor 6th", interval: 8 },
    { id: 8, label: "Major 6th", interval: 9 },
    { id: 9, label: "Minor 7th", interval: 10 },
    { id: 10, label: "Major 7th", interval: 11 },
    { id: 11, label: "Octave", interval: 12 },
  ],
};

function getRandomItem<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomOptionId(
  ids: number[] = pool.options.map(({ id }) => id),
) {
  return getRandomItem(pool.options.filter(({ id }) => ids.includes(id))).id;
}

export function getRandomNote() {
  return {
    pitch: getRandomItem(pool.pitches),
    octave: getRandomItem(pool.octaves),
  };
}

export function getOption(query: number | string) {
  const option = pool.options.find((option) => {
    if (typeof query === "string") {
      return option.label === query;
    }
    return option.id === query;
  });

  if (!option) {
    throw new Error(`Option with query ${query} not found`);
  }
  return option;
}
