import { Link } from "@inertiajs/react";

export default function TopMenu({ title, link, linkText }) {
    return (
        <div>
            <div className="flex justify-between h-12 items-center px-2 text-white bg-primary rounded-lg">
                <h2 className="md:text-lg text-base font-medium">{title}</h2>

                {linkText && (
                    <Link
                        href={link}
                        className="bg-white hover:bg-gray-200 text-sm text-primary md:px-4 px-2 md:py-2 py-1 rounded-lg"
                    >
                        {linkText}
                    </Link>
                )}
            </div>
        </div>
    );
}
