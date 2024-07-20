import { useController } from "react-hook-form";
import { useState } from "react";

export default function TextFile({ name, control, rules, multiple }) {
    const {
        field,
        fieldState: { invalid, error },
        formState: { isSubmitting, errors },
    } = useController({
        name,
        control,
        rules,
        defaultValue: multiple ? [] : "",
    });

    const [fileNames, setFileNames] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            // Handle file upload logic here
            // For example, you can save the file objects or upload them to a server
            field.onChange(files); // Update form state with file objects
            setFileNames(files.map((file) => file.name)); // Set the file names for display
        }
    };

    return (
        <div className="mb-4">
            <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
            >
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            </label>
            <input
                id={field.name}
                name={multiple ? `${field.name}[]` : field.name}
                type="file"
                onChange={handleFileChange}
                className={`mt-1 block w-full px-3 py-3 border ${
                    invalid ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                disabled={isSubmitting}
                multiple={multiple}
            />

            {fileNames.length > 0 && (
                <ul className="mt-2">
                    {fileNames.map((fileName, index) => (
                        <li key={index} className="text-sm text-gray-700">
                            {fileName}
                        </li>
                    ))}
                </ul>
            )}

            {invalid && (
                <p
                    className="mt-2 text-sm text-red-600"
                    id={`${field.name}-error`}
                >
                    {name.charAt(0).toUpperCase() + name.slice(1)} is required
                </p>
            )}
        </div>
    );
}
