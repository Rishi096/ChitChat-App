export function extractTime(dateString) {
	// Convert the dateString to a Date object
	const date = new Date(dateString);
	
	// Extract hours and minutes from the Date object
	let hours = date.getHours();
	const minutes = padZero(date.getMinutes());
	
	// Determine AM or PM
	const ampm = hours >= 12 ? 'PM' : 'AM';
	
	// Convert 24-hour time to 12-hour time
	hours = hours % 12 || 12;  // Converts "0" (midnight) to "12"
	
	// Pad hours if necessary
	const paddedHours = padZero(hours);

	// Return the formatted time as "HH:MM AM/PM"
	return `${paddedHours}:${minutes} ${ampm}`;
}
// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}
