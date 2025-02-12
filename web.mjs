import daysData from "./days.json" with { type: "json" };

// Month names array
const Months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

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
   for (let year = 1900; year <= 2050; year++) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
   }

   // Navigation buttons
   const prevButton = document.createElement("button");
   prevButton.textContent = "← Previous Month";
   prevButton.onclick = function () {
      changeMonth(-1);
   };

   const nextButton = document.createElement("button");
   nextButton.textContent = "Next Month →";
   nextButton.onclick = function () {
      changeMonth(1);
   };

   // Append elements
   container.appendChild(prevButton);
   container.appendChild(monthSelect);
   container.appendChild(yearSelect);
   container.appendChild(nextButton);

   document.body.appendChild(container);
}

// Function to change the month
function changeMonth(offset) {
   let month = parseInt(document.getElementById("monthSelect").value);
   let year = parseInt(document.getElementById("yearSelect").value);

   month += offset;

   if (month < 0) {
      month = 11;
      year--;
   } else if (month > 11) {
      month = 0;
      year++;
   }

   document.getElementById("monthSelect").value = month;
   document.getElementById("yearSelect").value = year;

   generateCalendar(year, month);
}

// Day names array
const DaysOfWeek = [
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
   "Sunday",
];

// Function to generate the calendar table with commemorative days
function generateCalendar(year, month) {
   let calendarContainer = document.getElementById("calendar");

   if (!calendarContainer) {
      calendarContainer = document.createElement("div");
      calendarContainer.id = "calendar";
      document.body.appendChild(calendarContainer);
   }

   calendarContainer.innerHTML = ""; // Clear previous calendar
   const table = document.createElement("table");
   table.style.borderCollapse = "collapse"; // Add this line

   // Header row for day names
   const headerRow = document.createElement("tr");
   DaysOfWeek.forEach((day) => {
      const th = document.createElement("th");
      th.textContent = day;
      th.style.border = "1px solid black"; // Add border to header cells
      headerRow.appendChild(th);
   });
   table.appendChild(headerRow);

   // Get first day of the month and total days
   const firstDay = new Date(year, month, 1).getDay();
   const daysInMonth = new Date(year, month + 1, 0).getDate();

   let row = document.createElement("tr");
   let dayCounter = 1;

   // Adjust the starting column so the first day is on Monday
   let startCol = (firstDay + 6) % 7; // Adjust to Monday as the first day of the week

   // Empty cells before first day
   for (let i = 0; i < startCol; i++) {
      const td = document.createElement("td");
      td.style.border = "1px solid black"; // Add border to empty cells
      row.appendChild(td);
   }

   // Fill in the days of the month
   for (let i = startCol; i < 7; i++) {
      const cell = document.createElement("td");
      cell.style.border = "1px solid black"; // Add border to day cells
      const currentDate = new Date(year, month, dayCounter);
      const currentDateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayCounter).padStart(2, "0")}`;
      const eventsForDate = daysData.filter((event) => {
         const eventDate = new Date(
            calculateDate(
               year,
               event.monthName,
               event.dayName,
               event.occurrence
            )
         );
         const eventDateString = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}`;
         return eventDateString === currentDateString;
      });

      cell.textContent = dayCounter++;

      if (eventsForDate.length > 0) {
         // Add event information to the cell
         const eventList = document.createElement("ul");
         eventList.classList.add("event-list"); // For styling

         eventsForDate.forEach((event) => {
            const eventItem = document.createElement("li");
            eventItem.textContent = event.name; // Or a more detailed display

            eventList.appendChild(eventItem);
         });
         cell.appendChild(eventList);
      }

      row.appendChild(cell);
   }
   table.appendChild(row);

   // Continue adding rows
   while (dayCounter <= daysInMonth) {
      row = document.createElement("tr");
      for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
         const cell = document.createElement("td");
         cell.style.border = "1px solid black"; // Add border to day cells
         const currentDate = new Date(year, month, dayCounter);
         const currentDateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayCounter).padStart(2, "0")}`;
         const eventsForDate = daysData.filter((event) => {
            const eventDate = new Date(
               calculateDate(
                  year,
                  event.monthName,
                  event.dayName,
                  event.occurrence
               )
            );
            const eventDateString = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}`;
            return eventDateString === currentDateString;
         });

         cell.textContent = dayCounter++;
         if (eventsForDate.length > 0) {
            // Add event information to the cell
            const eventList = document.createElement("ul");
            eventList.classList.add("event-list"); // For styling

            eventsForDate.forEach((event) => {
               const eventItem = document.createElement("li");
               eventItem.textContent = event.name; // Or a more detailed display

               eventList.appendChild(eventItem);
            });
            cell.appendChild(eventList);
         }
         row.appendChild(cell);
      }
      table.appendChild(row);
   }

   // Append the table
   calendarContainer.appendChild(table);
}

// Event listener for dropdown changes
document.addEventListener("change", () => {
   const month = parseInt(document.getElementById("monthSelect").value);
   const year = parseInt(document.getElementById("yearSelect").value);
   generateCalendar(year, month);
});

// Helper function to calculate dates based on occurrence
function calculateDate(year, monthName, dayName, occurrence) {
   const monthIndex = Months.indexOf(monthName);
   const dayIndex = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ].indexOf(dayName);
   let day = 1;
   let count = 0;

   while (new Date(year, monthIndex, day).getDay() !== dayIndex) {
      day++;
   }

   if (occurrence === "second") {
      day += 7;
   } else if (occurrence === "third") {
      day += 14;
   } else if (occurrence === "last") {
      let lastDay = new Date(year, monthIndex + 1, 0).getDate(); // Last day of the month
      let tempDay = lastDay;
      while (new Date(year, monthIndex, tempDay).getDay() !== dayIndex) {
         tempDay--;
      }
      day = tempDay;
   } else if (occurrence !== "first") {
      throw new Error("Unrecognized occurrence: " + occurrence);
   }
   return new Date(year, monthIndex, day);
}

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
