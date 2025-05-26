export const TextArea = ({
    id,
    label,
    value,
    onChange,
    rows = 8,
    placeholder = "",
}) => {
    return (
        <div className="mb-5">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <textarea
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                rows={rows}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
                {placeholder}
            </textarea>
        </div>
    );
};
