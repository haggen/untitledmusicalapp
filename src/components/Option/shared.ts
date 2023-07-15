export function getOptionState(
  selectedOptionId: number,
  correctOptionId: number,
  optionIds: number[],
) {
  if (!optionIds.includes(selectedOptionId)) {
    return "unselected";
  }

  if (selectedOptionId === correctOptionId) {
    return "correct";
  }

  return "incorrect";
}
