import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dropdown({ id, children }) {
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const handleShowDropdown = (dropdownId) => {
        if (openDropdownId === dropdownId) {
            setOpenDropdownId(null);
        } else {
            setOpenDropdownId(dropdownId);
        }
    };

    return (
        <div>
            <button
                onClick={() => handleShowDropdown(id)}
                className="ring-2 ring-transparent focus:ring-primary rounded-full"
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokelinecapp="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                </svg>
            </button>
            <div
                className={`z-50 bg-white ${
                    openDropdownId === id ? "" : "hidden"
                } divide-y divide-lightergray rounded-lg shadow z-30 w-44 absolute top-30 right-16 dropdown-menu`}
            >
                <ul className="py-2 text-sm text-gray-700">
                    <li>
                        <Link
                            href=""
                            className="block px-4 py-2 hover:bg-lightergray"
                        >
                            Generate PDF
                        </Link>
                    </li>
                    <li>
                        <a
                            href=""
                            className="block px-4 py-2 hover:bg-lightergray"
                        >
                            Edit
                        </a>
                    </li>
                    <li>
                        <Link
                            href=""
                            className="block px-4 py-2 hover:bg-lightergray deleteItem"
                        >
                            Delete
                        </Link>
                    </li>
                    {children}
                </ul>
            </div>
        </div>
    );
}
