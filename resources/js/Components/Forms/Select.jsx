import { cn } from "@/lib/utils";

export const Select = ({
    id,
    label,
    value,
    onChange,
    options = [],
    optionLabelKey = "label",
    optionValueKey = "value",
    placeholder = "Select an option",
    error,
    className = "",
    ...props
}) => {
    return (
        <div className="mb-5">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className={cn(
                    "shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                    className
                )}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                    <option
                        key={option[optionValueKey] ?? index}
                        value={option[optionValueKey]}
                    >
                        {option[optionLabelKey]}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};
