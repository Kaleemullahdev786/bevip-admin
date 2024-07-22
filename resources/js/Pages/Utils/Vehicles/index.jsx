import ActionButtons from "@/Components/ActionButtons";
import Dropdown from "@/Components/Dropdown";
import Pagination from "@/Components/Pagination";
import Tags from "@/Components/Tags";
import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";


export default function Featrures({ vehicles,features }) {
    const { errors } = usePage().props;
    useEffect(() => {
        if (errors && errors.success) {
            //reset form //
            toast.success(errors.success);
        }
    }, [errors]);



    return (
        <DashboardLayout>
            <TopMenu
                title={"vehicles"}
                link={"/dashboard/vehicles/create"}
                linkText={"Add New"}
            />

            <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-lightergray">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                name
                            </th>

                            <th scope="col" className="px-6 py-3">
                            Manufacturer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Model
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Features
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                status
                            </th>
                            <th scope="col" className="px-6 py-3 text-end">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles?.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}

                        {vehicles?.map((item, index) => (
                            <tr
                                className="odd:bg-white even:bg-gray-50"
                                key={index}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    {index + 1}



                                </th>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.manufacturer?.name}</td>
                                <td className="px-6 py-4">{item.brandmodel?.name}</td>


                                <td className="px-6 py-4"> <span style={{backgroundColor: item.color?.code, color:'white'}} >{item.color?.name}</span></td>

                                <td className="px-6 py-4">
                                <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">

                                { item.all_features?.map((item2,index2) =>

                                    <li class="flex items-center">
                                    <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                     </svg>

                                     {features[item2].name}
                                      {features[item2].deleted_at !== null && <span id="badge-dismiss-red" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300">deleted</span>


      }
                                </li>

                                    ) }
</ul>
                                </td>

                              <td>
                                <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-10 h-10 object-cover rounded-full"
                                    /></td>
                                <td className="px-6 py-4"><Tags type={item.status.toLowerCase()} /></td>
                                <td className="px-6 py-4 flex justify-end">
                                    <ActionButtons
                                        editRoute={`/dashboard/vehicles/edit/${item.id}`}
                                        deleteRoute={`/dashboard/vehicles/delete/${item.id}`}
                                        blockRoute={`/dashboard/vehicles/block/${item.id}`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-8 flex justify-end items-center">


                    {/* <Pagination links = {features.links}  /> */}
                </div>

            </div>
        </DashboardLayout>
    );
}
