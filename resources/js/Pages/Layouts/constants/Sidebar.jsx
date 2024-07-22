import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Sidebar() {
    const [dropdownOpen, setDropdownOpen] = useState({});

    const MenuBar = [
        {
            id: 1,
            name: "Dashboard",
            url: "/dashboard",
            canAccess: true,
            isActive: true,
            isDropdown: false,
        },

        {
            id: 2,
            name: "Vehicles Menu",
            url: "",
            canAccess: true,
            isActive: false,
            isDropdown: true,
            dropdownItems: [
                {name:'Vehicles', href:"/dashboard/vehicles"},
                {name:'Categories', href:"/dashboard/categories"},
                {name:'Types', href:"/dashboard/types"},
                {name:'Manufacturers', href:"/dashboard/manufacturers"},
                {name:'Models', href:"/dashboard/brand_models"},
                {name:'Features', href:"/dashboard/features"},
                {name:'Colors', href:"/dashboard/colors"}

            ],
        },
        {
            id: 3,
            name: "Booking Menu",
            url: "",
            canAccess: true,
            isActive: false,
            isDropdown: true,
            dropdownItems: [
                {name:'Bookings', href:"/dashboard/users"},
                {name:'New Bookings', href:"/dashboard/users"},
                {name:'Booking Calender', href:"/dashboard/users"},
                {name:'Manufacturers', href:"/dashboard/users"},
                // {name:'Push Notification', href:"/dashboard/users"},
                // {name:'Content Management', href:"/dashboard/users"}

            ],
        },

        {
            id: 4,
            name: "User Menu",
            url: "",
            canAccess: true,
            isActive: false,
            isDropdown: true,
            dropdownItems: [
                {name:'Customers', href:"/dashboard/users"},
                {name:'Users', href:"/dashboard/users"},
                {name:'Permissions', href:"/dashboard/roles"}
            ],
        },

        {
            id: 8,
            name: "Setting Menu",
            url: "",
            canAccess: true,
            isActive: false,
            isDropdown: true,
            dropdownItems: [
                {name:'Coupon', href:"/dashboard/users"},
                {name:'Location', href:"/dashboard/users"},
                {name:'Extra Addon', href:"/dashboard/users"},
                // {name:'Api Setting', href:"/dashboard/users"},
                {name:'Fare Setting', href:"/dashboard/users"},
                {name:'General Setting', href:"/dashboard/users"},
                {name:'Payment Setting', href:"/dashboard/users"},
                {name:'Car Camparison', href:"/dashboard/users"},


            ],
        },
        {
            id: 7,
            name: "Logout",
            url: "/logout",
            canAccess: true,
            isActive: false,
            isDropdown: false,
        },
    ];

    const toggleDropdown = (id) => {
        setDropdownOpen((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="p-3">
            <ul className="flex flex-col w-full">
                {MenuBar.map((menu, index) => {
                    return (
                        <div key={index}>
                            <li
                                className={`${
                                    menu.isActive
                                        ? "bg-primary text-white rounded-md hover:bg-primary"
                                        : ""
                                } p-3 hover:bg-lightgray rounded-md transition-all cursor-pointer my-1`}
                                onClick={() =>
                                    menu.isDropdown && toggleDropdown(menu.id)
                                }
                            >
                                {menu.isDropdown ? (
                                    <div className="flex justify-between items-center">
                                        <span>{menu.name}</span>
                                        <span>
                                            {dropdownOpen[menu.id] ? (
                                                <FiChevronUp />
                                            ) : (
                                                <FiChevronDown />
                                            )}
                                        </span>
                                    </div>
                                ) : (
                                    <Link href={menu.url}>{menu.name}</Link>
                                )}
                            </li>
                            {(menu.isDropdown && dropdownOpen[menu.id] || menu.isDropdown && dropdownOpen[menu.is_open]) && (
                                <ul className="pl-5 block">
                                    {menu.dropdownItems.map((item, index) => (
                                        <Link href={item.href} key={index}>
                                            <li className="p-2 hover:bg-lightgray rounded-md transition-all cursor-pointer my-1">
                                                {item.name}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}
