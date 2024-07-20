import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useController } from "react-hook-form";

export default function RichTextEditor({ name, control, defaultValue }) {
    const {
        field: { value, onChange },
        fieldState: { invalid },
        formState: { isSubmitting },
    } = useController({
        name,
        control,
        rules: {},
        defaultValue: defaultValue || "",
    });

    // Ensure the initial value is set correctly
    const [editorData, setEditorData] = useState(value || "");

    // Update the form field value when editorData changes
    useEffect(() => {
        onChange(editorData);
    }, [editorData, onChange]);

    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 pb-1"
            >
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
                disabled={isSubmitting}
            />
            {invalid && (
                <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
                    {name.charAt(0).toUpperCase() + name.slice(1)} is required
                </p>
            )}
        </div>
    );
}
