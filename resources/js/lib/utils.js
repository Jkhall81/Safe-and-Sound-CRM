import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatPhoneNumber(number) {
    // Remove non-numeric characters
    const cleaned = number.replace(/\D/g, "");

    // Check if we have a valid phone number with enough digits
    if (cleaned.length === 10) {
        // Format the phone number as (xxx)-xxx-xxxx
        return `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)}-${cleaned.slice(
            6,
            10
        )}`;
    }

    // If the number doesn't have 10 digits, return it as is (or handle errors if needed)
    return number;
}

export const getFormattedEmail = (email) => {
    try {
        const parsedEmail = JSON.parse(email);

        // Check if the email contains a "Personal" type and return the value
        const personalEmail = parsedEmail
            .map((obj) => (obj.type === "Personal" ? obj.value : null))
            .filter((value) => value !== null)[0];

        return personalEmail || ""; // Return personal email or empty string if not found
    } catch (error) {
        return email; // Return the plain string if it's not in JSON format
    }
};
