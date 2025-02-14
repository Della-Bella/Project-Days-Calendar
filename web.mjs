// import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

import { calculateNewMonthYear, generateCalendar, Months } from "./common.mjs";

// Function to create dropdown selectors
function createSelectors() {
   const container = document.createElement("div");
   container.id = "selectors";

   // Style the selectors container
   Object.assign(container.style, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      backgroundColor: "#f0f0f0",
      marginBottom: "10px",
   });

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

   // Style the dropdowns
   const selectStyle = {
      margin: "0 5px",
      padding: "8px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
   };
   Object.assign(monthSelect.style, selectStyle);
   Object.assign(yearSelect.style, selectStyle);

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

   // Style the buttons
   const buttonStyle = {
      padding: "8px 12px",
      fontSize: "16px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      margin: "0 5px",
   };
   Object.assign(prevButton.style, buttonStyle);
   Object.assign(nextButton.style, buttonStyle);

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

// Style the body
Object.assign(document.body.style, {
   fontFamily: "Arial, sans-serif",
   margin: "0",
   padding: "0",
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   backgroundColor: "#fafafa",
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
