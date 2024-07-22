import React from "react";
import { useState } from "react";
const Pagination = ({ links }) => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const onPageChange = (page: number) => setCurrentPage(page);
console.log(links);
    return (
        <nav aria-label="Page navigation border-none">
            <ul className="flex items-center -space-x-px h-10 text-base">


                {links.map((link, index) => {
const Active  = links.active;
                    return (
                        <li key={index}>
                            <a
                                href={link.url}
className={`flex items-center ${Active ? "active" : ""} justify-center px-3 h-8 leading-tight text-gray-500 bg-white
    border border-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${Active ? 'active' : ''}`}
>

                                <div dangerouslySetInnerHTML={{ __html: link.label }} ></div></a>
                        </li>
                    )

                })}



            </ul>
        </nav>


    );
};

export default Pagination;
