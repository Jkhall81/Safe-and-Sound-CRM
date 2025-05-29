import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

export const MyDatePicker = ({ value, onChange, className }) => {
    const handleDateChange = (date) => {
        // If the date passed by DatePicker is a string (manual input), convert it to a Date object
        if (typeof date === "string") {
            date = new Date(date); // Convert string to Date object
        }

        // Ensure the value is a valid Date object before calling onChange
        if (!isNaN(date)) {
            onChange(date); // Pass the valid Date object to the parent onChange handler
        } else {
            console.log("Invalid date format:", date); // Optional: log invalid dates
        }
    };

    return (
        <DatePicker
            selected={value ? new Date(value) : null} // Ensure value is always a Date object or null
            onChange={handleDateChange}
            className={cn(
                "shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                className
            )}
            dateFormat="MM/dd/yyyy" // Ensure the input follows a consistent format
        />
    );
};
