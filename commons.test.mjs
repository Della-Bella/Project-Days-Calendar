import { calculateNewMonthYear } from "./common.mjs";
import { Months } from "./common.mjs";

test("if month is March, result should be April if offset is +1", () => {
  const { month, year } = calculateNewMonthYear(1, 2, 2025);

  expect(month).toEqual(3);
  expect(year).toEqual(2025);
});

test("Months array should have 12 months", () => {
  expect(Months.length).toEqual(12);
});

test("First month should be January", () => {
  expect(Months[0]).toEqual("January");
});

