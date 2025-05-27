const defaultOptions = ["Mobile", "Home", "Work"];

export const MultiSelectInput = ({
    id,
    label,
    value = [],
    onChange,
    selectOptions = defaultOptions,
    placeholder = "Enter value",
}) => {
    const handleFieldChange = (index, field, fieldValue) => {
        const updated = [...value];
        updated[index][field] = fieldValue;
        onChange && onChange(updated);
    };

    const addNewField = () => {
        const remaining = selectOptions.filter(
            (opt) => !value.some((entry) => entry.type === opt)
        );
        if (remaining.length > 0) {
            onChange([...value, { type: remaining[0], value: "" }]);
        }
    };

    const removeLastField = () => {
        const updated = [...value];
        updated.pop();
        onChange(updated);
    };

    const canAddMore = value.length < selectOptions.length;
    const canRemove = value.length > 1;

    return (
        <div className="mb-5">
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                    {label}
                </label>
            )}

            <div className="space-y-3 rounded" id={id}>
                {value.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <select
                            value={item.type}
                            onChange={(e) =>
                                handleFieldChange(index, "type", e.target.value)
                            }
                            className="w-[120px] bg-gray-50 border border-gray-300 text-sm rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            {selectOptions.map((option) => (
                                <option
                                    key={option}
                                    value={option}
                                    disabled={value.some(
                                        (entry, i) =>
                                            i !== index && entry.type === option
                                    )}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            value={item.value}
                            onChange={(e) =>
                                handleFieldChange(
                                    index,
                                    "value",
                                    e.target.value
                                )
                            }
                            placeholder={placeholder}
                            className="flex-1 bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                ))}
            </div>

            <div className="mt-3 flex space-x-4">
                {canAddMore && (
                    <button
                        type="button"
                        onClick={addNewField}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        + Add Another
                    </button>
                )}

                {canRemove && (
                    <button
                        type="button"
                        onClick={removeLastField}
                        className="text-sm text-red-600 hover:underline"
                    >
                        − Remove Last
                    </button>
                )}
            </div>
        </div>
    );
};
