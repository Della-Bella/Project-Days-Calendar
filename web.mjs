// import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

import { calculateNewMonthYear, generateCalendar, Months } from "./common.mjs";

// Function to create dropdown selectors
function createSelectors() {
  const container = document.createElement("div");
  container.id = "selectors";

  // Month dropdown
  const monthSelect = document.createElement("select");
  monthSelect.id = "monthSelect";

  Months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  // Year dropdown
  const yearSelect = document.createElement("select");
  yearSelect.id = "yearSelect";
  for (let year = 1900; year <= 2100; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  // Navigation buttons
  const prevButton = document.createElement("button");
  prevButton.textContent = "← Previous Month";
  prevButton.onclick = function () {
    changeMonthInDom(-1);
  };

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next Month →";
  nextButton.onclick = function () {
    changeMonthInDom(1);
  };

  // Append elements
  container.appendChild(prevButton);
  container.appendChild(monthSelect);
  container.appendChild(yearSelect);
  container.appendChild(nextButton);

  document.body.appendChild(container);
}

function changeMonthInDom(offset) {
  let currentMonth = parseInt(document.getElementById("monthSelect").value);
  let currentYear = parseInt(document.getElementById("yearSelect").value);

  const { month, year } = calculateNewMonthYear(
    offset,
    currentMonth,
    currentYear
  );

  document.getElementById("monthSelect").value = month;
  document.getElementById("yearSelect").value = year;

  generateCalendar(year, month);
}

// Event listener for dropdown changes
document.addEventListener("change", () => {
  const month = parseInt(document.getElementById("monthSelect").value);
  const year = parseInt(document.getElementById("yearSelect").value);
  generateCalendar(year, month);
});

// Initialize everything on page load
window.onload = function () {
  createSelectors(); // Create dropdowns

  // Set current month and year
  const currentDate = new Date();
  document.getElementById("monthSelect").value = currentDate.getMonth();
  document.getElementById("yearSelect").value = currentDate.getFullYear();

  // Generate the calendar
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
};
