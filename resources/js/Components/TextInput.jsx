import React from "react";

export default function TextInput({
    id,
    type = "text",
    name,
    value,
    className = "",
    autoComplete,
    required,
    isFocused,
    onChange,
    onBlur,
    placeholder,
    disabled,
}) {
    const inputRef = React.useRef();

    React.useEffect(() => {
        if (isFocused) {
            inputRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            id={id}
            ref={inputRef}
            type={type}
            name={name || id}
            value={value}
            className={
                "border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm " +
                className
            }
            autoComplete={autoComplete}
            required={required}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
}
