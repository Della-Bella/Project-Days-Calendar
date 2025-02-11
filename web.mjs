// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// import { getGreeting } from "./common.mjs";
// import daysData from "./days.json" with { type: "json" };

// window.onload = function() {
//     document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;


// // to run the code in the terminal we need to remove window.onload which run in the server https
// // console.log(`${getGreeting()} - there are ${daysData.length} known days`);

// Import functions and JSON data
// import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

// Month names array
const Months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
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

    createCalendar(year, month);
}

// Day names array
const DaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


// Function to create the calendar table
function createCalendar(year, month) {
    let calendarContainer = document.getElementById("calendar");

    if (!calendarContainer) {
        calendarContainer = document.createElement("div");
        calendarContainer.id = "calendar";
        document.body.appendChild(calendarContainer);
    }

    calendarContainer.innerHTML = ""; // Clear previous calendar
    const table = document.createElement("table");

    // Header row for day names
    const headerRow = document.createElement("tr");
    DaysOfWeek.forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Get first day of the month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let row = document.createElement("tr");
    let dayCounter = 1;

    // Empty cells before first day
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        row.appendChild(document.createElement("td"));
    }

    // Fill in the days of the month
    for (let i = (firstDay === 0 ? 6 : firstDay - 1); i < 7; i++) {
        const cell = document.createElement("td");
        cell.textContent = dayCounter++;
        row.appendChild(cell);
    }
    table.appendChild(row);

    // Continue adding rows
    while (dayCounter <= daysInMonth) {
        row = document.createElement("tr");
        for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
            const cell = document.createElement("td");
            cell.textContent = dayCounter++;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    // Append the table
    calendarContainer.appendChild(table);
}


createSelectors();
changeMonth();
createCalendar();
