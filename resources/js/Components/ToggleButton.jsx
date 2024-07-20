import { router } from "@inertiajs/react";
export default function ToggleButton({ updateUrl, id, isChecked }) {
    const updatePermission = (id) => {
        router.post(updateUrl, { id: id });
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={isChecked ? true : false}
                value={id}
                className="sr-only peer"
                onChange={() => updatePermission(id)}
            />

            <div className="w-11 h-6 bg-lightgray peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-green-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-green-400 after:border-green-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-300"></div>
        </label>
    );
}
