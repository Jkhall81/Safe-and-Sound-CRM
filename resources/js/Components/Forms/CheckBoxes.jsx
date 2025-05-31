export const CheckBoxes = ({ id, label, checkLabels, values, onChange }) => {
    return (
        <div>
            <label
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                htmlFor={id}
            >
                {label}
            </label>
            <div className="space-y-2">
                {checkLabels.map((checkLabel) => {
                    const inputId = `${id}-${checkLabel}`;
                    return (
                        <div key={checkLabel} className="flex items-center">
                            <input
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                type="checkbox"
                                id={inputId}
                                name={id}
                                value={checkLabel}
                                checked={values.includes(checkLabel)}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (e.target.checked) {
                                        onChange([...values, newValue]);
                                    } else {
                                        onChange(
                                            values.filter((v) => v !== newValue)
                                        );
                                    }
                                }}
                            />
                            <label
                                htmlFor={inputId}
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {checkLabel}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
