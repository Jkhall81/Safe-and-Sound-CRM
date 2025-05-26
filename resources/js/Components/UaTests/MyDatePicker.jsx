import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const MyDatePicker = ({ value, onChange }) => {
    return (
        <DatePicker
            selected={value}
            onChange={onChange}
            className="shadow-xs w-[380px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
    );
};
