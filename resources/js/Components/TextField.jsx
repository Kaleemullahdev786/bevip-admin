import { useController } from "react-hook-form";

export default function TextField({ name, control, rules }) {
    const {
        field,
        fieldState: { invalid, error },
        formState: { isSubmitting, errors },
    } = useController({
        name,
        control,
        rules,
        defaultValue: "",
    });
    return (
        <div className="mb-4">
            <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
            >
                {/* first letter uppercase */}
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            </label>
            <input
                {...field}
                placeholder={`Enter ${field.name}`}
                type={
                    field.name === "password"
                        ? "password"
                        : field.name === "email"
                        ? "email"
                        : field.name === "phone" ||
                          field.name === "mobile" ||
                          field.name === "price"
                        ? "number"
                        : "text"
                }
                className={`mt-1 block w-full px-3 py-3 border ${
                    invalid ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                disabled={isSubmitting}
            />
            {invalid && (
                <p
                    className="mt-2 text-sm text-red-600"
                    id={`${field.name}-error`}
                >
                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)}{" "}
                    is required
                </p>
            )}
        </div>
    );
}
