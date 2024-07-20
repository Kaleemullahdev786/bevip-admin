import { Link } from "@inertiajs/react";
import { FiEdit, FiTrash, FiSlash } from "react-icons/fi";

export default function ActionButtons({ editRoute, deleteRoute, blockRoute }) {
    // confirm before delete //
    const confirmDelete = (event) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            event.preventDefault(); // Prevent the default action if the user cancels
        }
    };

    return (
        <div className="flex gap-1 justify-end">
            {editRoute && (
                <Link
                    href={editRoute}
                    className="border-2 hover:border-primary transition-all border-light p-1.5 rounded-lg"
                >
                    <FiEdit color="#012d40" />
                </Link>
            )}

            {deleteRoute && (
                <Link
                    onClick={confirmDelete}
                    href={deleteRoute}
                    className="border-2 hover:border-danger transition-all border-light p-1.5 rounded-lg"
                >
                    <FiTrash color="#012d40" className="hover:text-danger" />
                </Link>
            )}

            {blockRoute && (
                <Link
                    href={blockRoute}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >
                    <FiSlash color="#012d40" />
                </Link>
            )}
        </div>
    );
}
