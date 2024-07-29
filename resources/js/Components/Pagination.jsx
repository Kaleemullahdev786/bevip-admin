import { Link } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
const Pagination = ({ links }) => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const onPageChange = (page: number) => setCurrentPage(page);
    console.log(links);
    var  Active = false;
    return (
        <nav aria-label="Page navigation border-none">
            <ul className="flex items-center -space-x-px h-10 text-base">


                {links.map((link, index) => {
                      const isActive = link.active;
                      const isDisabled = !link.url;
                      const regex = /Previous|Next/g;
                    return (
                        // <li key={index}>
                        //     <Link
                        //         href={link.url}
                        //         className={`flex items-center justify-center px-3 h-8 leading-tight
                        //             border border-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-primary-700 dark:hover:text-white

                        //             ${link.active ? 'bg-black' :''}`}
                        //             >

                        //         <div dangerouslySetInnerHTML={{ __html: link.label }} ></div></Link>
                        // </li>
                        <li key={index} >
                            <Link
                                href={link.url || '#' }
                                className={`flex items-center justify-center ml-2 px-4 py-2 border rounded-md
                                    ${isActive ? 'bg-primary text-white border-black-600' : 'bg-white text-gray-500 border-gray-300'}
                                    ${isDisabled ? 'cursor-not-allowed opacity-100' : 'hover:bg-primary'}
                                `}
                                dangerouslySetInnerHTML={{ __html: link.label.replace(regex,'') }}
                                aria-disabled={isDisabled}
                            />
                        </li>
                    )

                })}



            </ul>
        </nav>




    );
};

export default Pagination;
