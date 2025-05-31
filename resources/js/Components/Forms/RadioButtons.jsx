export const RadioButtons = ({
    id,
    label,
    radioLabels,
    value,
    onChange,
    ...props
}) => {
    return (
        <div>
            <label
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                htmlFor={id}
            >
                {label}
            </label>
            <div className="space-y-2">
                {radioLabels.map((radioLabel, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            type="radio"
                            id={`${id}-${index}`}
                            name={id}
                            value={radioLabel}
                            checked={value === radioLabel}
                            onChange={onChange}
                            {...props}
                        />
                        <label
                            htmlFor={`${id}-${index}`}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            {radioLabel}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};
