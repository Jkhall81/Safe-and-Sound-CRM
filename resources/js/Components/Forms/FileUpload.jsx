import { cn } from "@/lib/utils";

export const FileUpload = ({
    id,
    label,
    multiple = false,
    onChange,
    className = "",
    error,
    ...props
}) => {
    return (
        <div className="mb-5">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Attach Files
            </label>
            <input
                id={id}
                name={id}
                type="file"
                multiple={multiple}
                onChange={onChange}
                className={cn(
                    "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white dark:bg-gray-700 dark:border-gray-600",
                    className
                )}
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};
