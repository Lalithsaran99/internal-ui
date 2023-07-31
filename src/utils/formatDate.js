export function formatDate(dateString) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Split the input date string into day, month, and year parts
  const [day, month, year] = dateString.split("-").map(Number);

  // Create a Date object from the extracted parts
  const date = new Date(year, month - 1, day);

  // Get the day of the week and month as strings
  const dayOfWeek = weekdays[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthName = months[date.getMonth()];

  // Format the date as desired (e.g., "Wed, 16 Dec")
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthName}`;

  return formattedDate;
}
