# Dynamic Calendar Project

This project is a dynamic calendar web application that displays a calendar for any given month and year, highlighting commemorative days based on data from a JSON file. It also includes an iCal generator for importing these commemorative days into calendar applications like Google Calendar.

## Features

*   **Dynamic Calendar Display:**
    *   Displays a calendar for any month and year.
    *   Each day is represented as a rectangle in a grid.
    *   Weeks are displayed as rows, starting on Monday.
    *   Dates before/after the current month are shown or left blank.
*   **Month Navigation:**
    *   "Previous Month" and "Next Month" buttons for easy navigation.
    *   Month and year dropdowns for quick selection.
*   **Commemorative Days:**
    *   Dynamically loads commemorative days from a JSON file.
    *   Highlights commemorative days on the calendar grid.
    *   Correctly handles commemorative days across different years.
*   **iCal Export (Group Project):**
    *   Generates an iCal (.ics) file for importing into calendar applications.
    *   Includes entries for commemorative days from 2020 to 2030 (inclusive).
    *   Logic for calculating dates is shared between the web generator and the iCal generator.
*   **Description Fetching and Display (Group Project):**
    *   Fetches descriptions of commemorative days from URLs provided in the JSON file.
    *   Displays the description when a commemorative day is clicked on the web page.
    *   Includes the description in the DESCRIPTION field of the iCal file.
*   **Automated Deployment:**
    *   The website is hosted on the internet and automatically deploys when changes are merged to the GitHub repository.
*   **Unit Tests:** The project includes a variety of unit tests that demonstrate the correct functioning of core features.

## Technologies Used

*   HTML
*   JavaScript (ES Modules)
*   JSON
*   Node.js (for iCal generator)
*   Jest (for unit testing)


## Contribution

This project was a collaborative effort.

We are responsible for code quality, functionality, and testing. We are able to explain any section of code.

## Live Demo
[calendar-cyf.netlify.app](https://calendar-cyf.netlify.app/)

