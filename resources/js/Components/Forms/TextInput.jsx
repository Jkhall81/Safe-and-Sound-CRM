import { cn } from "@/lib/utils";

export const TextInput = ({
    id,
    label,
    value,
    onChange,
    error,
    type = "text",
    className = "",
}) => {
    return (
        <div className="mb-5">
            <label
                htmlFor={id}
                className="block mb-2 text-lg font-medium text-white dark:text-white"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className={cn(
                    "shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                    className
                )}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};
