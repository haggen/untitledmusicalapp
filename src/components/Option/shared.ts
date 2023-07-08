import { TOption } from "~/src/lib/data";

export function getOptionState(
  selectedOption: TOption,
  correctOption: TOption,
  options: TOption[]
) {
  if (!options.includes(selectedOption)) {
    return "unselected";
  }

  if (selectedOption === correctOption) {
    return "correct";
  }

  return "incorrect";
}
