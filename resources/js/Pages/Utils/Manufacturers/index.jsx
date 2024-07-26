import ActionButtons from "@/Components/ActionButtons";
import Dropdown from "@/Components/Dropdown";
import Pagination from "@/Components/Pagination";
import Tags from "@/Components/Tags";
import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";


export default function Featrures({ manufacturers }) {
    const { errors } = usePage().props;
    useEffect(() => {
        if (errors && errors.success) {
            //reset form //
            toast.success(errors.success);
        }
    }, [errors]);

    // console.log(features);
    return (
        <DashboardLayout>
            <TopMenu
                title={"Manufacturers"}
                link={"/dashboard/manufacturers/create"}
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
                                Picture
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
                        {manufacturers?.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}

                        {manufacturers?.map((item, index) => (
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
                                <td className="px-6 py-4">{item.make}</td>
                                <img
                                        src={item.full_path}
                                        alt={item.name}
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                <td className="px-6 py-4"><Tags type={item.status.toLowerCase()} /></td>
                                <td className="px-6 py-4 flex justify-end">
                                    <ActionButtons
                                        editRoute={`/dashboard/manufacturers/edit/${item.id}`}
                                        deleteRoute={`/dashboard/manufacturers/delete/${item.id}`}
                                        blockRoute={`/dashboard/manufacturers/block/${item.id}`}
                                        restoreRoute={`/dashboard/manufacturers/restored/${item.id}`}
                                        item = {item}
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
