/**
 * Formats a date string into a consistent format for both server and client rendering.
 * Uses UTC to ensure consistent timezone handling.
 * @param dateString - ISO date string
 * @returns Formatted date string in "Month Day, Year" format
 */
export const formatDate = (dateString: string): string => {
  try {
    // Parse the date string and ensure UTC
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    // Use UTC methods to ensure consistent formatting
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    // Format with consistent month names
    const months = [
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

    return `${months[month]} ${day}, ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};
