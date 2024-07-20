import React from "react";
import { useController } from "react-hook-form";
import Select from "react-select";

export default function SelectField({
    name,
    control,
    options,
    rules,
    multiple,
}) {
    const {
        field,
        fieldState: { invalid, error },
        formState: { isSubmitting, errors },
    } = useController({
        name,
        control,
        rules,
    });

    return (
        <div className="mb-4">
            <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
            >
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            </label>
            <Select
                isMulti={multiple}
                styles={{
                    control: (styles) => ({
                        ...styles,
                        border: "none",
                        padding: "4px 0px 4px 0px",
                    }),
                }}
                options={options}
                {...field}
                value={options.find((option) => option.value === field.value)}
                className={`mt-1 block w-full border ${
                    invalid ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none sm:text-sm`}
                isDisabled={isSubmitting}
            />
            {invalid && (
                <p
                    className="mt-2 text-sm text-red-600"
                    id={`${field.name}-error`}
                >
                    {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
                    {error.message}
                </p>
            )}
        </div>
    );
}
