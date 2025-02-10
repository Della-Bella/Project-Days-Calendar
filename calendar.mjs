// calendar.mjs
export function generateCalendar(year, month) {
   const calendarBody = document.getElementById("calendarBody");
   const firstDay = new Date(year, month, 1);
   const lastDay = new Date(year, month + 1, 0);
   const startDay = firstDay.getDay();

   const adjustedStartDay = startDay === 0 ? 6 : startDay - 1; // Monday is first column
   calendarBody.innerHTML = "";

   let date = 1;
   for (let row = 0; row < 6; row++) {
      let tr = document.createElement("tr");
      for (let col = 0; col < 7; col++) {
         let td = document.createElement("td");

         if (row === 0 && col < adjustedStartDay) {
            td.textContent = "";
         } else if (date > lastDay.getDate()) {
            td.textContent = "";
         } else {
            td.textContent = date;
            td.textContent = date;
            date++;
         }

         tr.appendChild(td);
      }
      calendarBody.appendChild(tr);
   }
}
