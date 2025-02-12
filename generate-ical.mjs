import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";

const data = JSON.parse(fs.readFileSync("days.json", "utf8"));

function getDateByOccurrence(year, monthName, dayName, occurrence) {
   const monthNames = [
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
   const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];

   const monthIndex = monthNames.indexOf(monthName);
   if (monthIndex === -1) {
      console.error(`Invalid month name: ${monthName}`);
      return null;
   }

   const dayIndex = dayNames.indexOf(dayName);
   if (dayIndex === -1) {
      console.error(`Invalid day name: ${dayName}`);
      return null;
   }

   let count = 0;
   let day = 1;
   let foundDate = null;

   const firstDayOfMonth = new Date(Date.UTC(year, monthIndex, 1));
   const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();

   for (day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(Date.UTC(year, monthIndex, day));

      if (currentDate.getUTCDay() === dayIndex) {
         count++;

         if (occurrence === "first" && count === 1) {
            foundDate = currentDate;
            break;
         } else if (occurrence === "second" && count === 2) {
            foundDate = currentDate;
            break;
         } else if (occurrence === "third" && count === 3) {
            foundDate = currentDate;
            break;
         } else if (occurrence === "last") {
            // For "last" occurrence, keep updating until the end
            foundDate = currentDate;
         }
      }
   }

   if (!foundDate && occurrence !== "last") {
      console.warn(
         `Could not find the ${occurrence} ${dayName} in ${monthName} ${year}`
      );
      return null;
   } else if (!foundDate && occurrence === "last") {
      console.warn(
         `Could not find the last ${dayName} in ${monthName} ${year}`
      );
      return null;
   }

   return foundDate;
}

function formatDateForICal(date) {
   const year = date.getUTCFullYear();
   const month = String(date.getUTCMonth() + 1).padStart(2, "0");
   const day = String(date.getUTCDate()).padStart(2, "0");
   const hours = "00";
   const minutes = "00";
   const seconds = "00";
   return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function generateIcalContent(events, startYear, endYear) {
   let icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Organization//Your Application//EN
CALSCALE:GREGORIAN
`;

   for (let year = startYear; year <= endYear; year++) {
      for (const eventData of events) {
         const eventDate = getDateByOccurrence(
            year,
            eventData.monthName,
            eventData.dayName,
            eventData.occurrence
         );

         if (!eventDate) {
            console.warn(`Skipping event ${eventData.name} in ${year}`);
            continue;
         }

         const uid = uuidv4();
         const startFormatted = formatDateForICal(eventDate);
         const endFormatted = formatDateForICal(eventDate);

         icalContent += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDateForICal(new Date())}
DTSTART:${startFormatted}
DTEND:${endFormatted}
SUMMARY:${eventData.name}
DESCRIPTION:${eventData.descriptionURL ? eventData.descriptionURL : ""}
END:VEVENT
`;
      }
   }

   icalContent += `END:VCALENDAR`;
   return icalContent;
}

const startYear = 2020;
const endYear = 2030;

const icalEvents = data;
const icalString = generateIcalContent(icalEvents, startYear, endYear);

console.log(icalString);
