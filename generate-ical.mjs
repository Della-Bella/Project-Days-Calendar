// generate-ical.mjs
// You may need to adjust the import based on your specific setup
// If running in a browser:
import daysData from "./days.json" with { type: "json" };
// If running in Node.js
// import * as fs from 'fs';

// Lookup tables for month and day names
export const monthNameLookup = {
   January: 0,
   February: 1,
   March: 2,
   April: 3,
   May: 4,
   June: 5,
   July: 6,
   August: 7,
   September: 8,
   October: 9,
   November: 10,
   December: 11,
};

export const dayNameLookup = {
   Sunday: 0,
   Monday: 1,
   Tuesday: 2,
   Wednesday: 3,
   Thursday: 4,
   Friday: 5,
   Saturday: 6,
};

// Function to calculate the date of a commemorative day
export function calculateDate(year, monthName, dayName, occurrence) {
   const monthIndex = monthNameLookup[monthName]; // Month is 0-indexed
   if (monthIndex === undefined) {
      throw new Error("Invalid month name: " + monthName);
   }

   const dayIndex = dayNameLookup[dayName];
   if (dayIndex === undefined) {
      throw new Error("Invalid day name: " + dayName);
   }

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

// Function to format a date into the iCalendar format (YYYYMMDDTHHMMSSZ)
export function formatDate(date) {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0");
   const day = String(date.getDate()).padStart(2, "0");
   return `${year}${month}${day}T000000Z`;
}

// Function to generate the iCalendar content from the days data
export function generateICalContent(days) {
   let iCalendarContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CodeYourFuture//NONSGML Commemorative Days//EN
CALSCALE:GREGORIAN
`;

   for (let year = 2020; year <= 2030; year++) {
      for (const day of days) {
         // Use a for...of loop for better readability
         try {
            const eventDate = calculateDate(
               year,
               day.monthName,
               day.dayName,
               day.occurence
            );
            const startDate = formatDate(eventDate);
            const endDate = formatDate(
               new Date(
                  eventDate.getFullYear(),
                  eventDate.getMonth(),
                  eventDate.getDate() + 1
               )
            ); // Add 1 day for the end date

            iCalendarContent += `BEGIN:VEVENT
UID:${startDate}-${day.name.replace(/\s/g, "")}-${year}@codeyourfuture.com
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${day.name}
DESCRIPTION:${day.descriptionURL}
END:VEVENT
`;
         } catch (error) {
            console.error(
               `Error processing ${day.name} for year ${year}:`,
               error
            );
         }
      }
   }

   iCalendarContent += "END:VCALENDAR";
   return iCalendarContent;
}

