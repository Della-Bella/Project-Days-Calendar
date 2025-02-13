// import { calculateNewMonthYear } from "./common.mjs";

// test("if month is March, result should be April if offset is +1", () => {
//   const { month, year } = calculateNewMonthYear(1, 2, 2025);

//   expect(month).toEqual(3);
//   expect(year).toEqual(2025);
// });


import { daysData } from "./loadDays.mjs"; // Import days.json dynamically
import { calculateNewMonthYear } from "./common.mjs";

test("if month is March, result should be April if offset is +1", () => {
  const { month, year } = calculateNewMonthYear(1, 2, 2025);

  expect(month).toEqual(3);
  expect(year).toEqual(2025);
});

test("days.json should contain valid data", () => {
  expect(daysData).toBeDefined();
  expect(Array.isArray(daysData)).toBe(true);
  expect(daysData[0]).toHaveProperty("name");
  expect(daysData[0]).toHaveProperty("monthName");
});
