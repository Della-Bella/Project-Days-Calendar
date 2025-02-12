import { calculateNewMonthYear } from "./common.mjs";

test("if month is March, result should be April if offset is +1", () => {
  const { month, year } = calculateNewMonthYear(1, 2, 2025);

  expect(month).toEqual(3);
  expect(year).toEqual(2025);
});
