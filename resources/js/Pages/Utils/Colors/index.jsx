import ActionButtons from "@/Components/ActionButtons";
import Dropdown from "@/Components/Dropdown";
import { Controller } from "react-hook-form";
import TextField from "@/Components/TextField";
import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Tags from "@/Components/Tags";

export default function YachtSizes({ colors }) {
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
                title={"Colors"}
                link={"/dashboard/colors/create"}
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
                            color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-end">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {colors?.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}

                        {colors?.map((item, index) => (
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
                                <td className="px-6 py-4">{item.color}</td>
                                <td className="px-6 py-4">
                                <span style={{backgroundColor: item.code, color:'white'}} >{item.color}</span>

                                </td>
                                <td className="px-6 py-4"><Tags type={item.status.toLowerCase()} /></td>
                                <td className="px-6 py-4 flex justify-end">
                                    <ActionButtons
                                        editRoute={`/dashboard/colors/edit/${item.id}`}
                                        deleteRoute={`/dashboard/colors/delete/${item.id}`}
                                        blockRoute={`/dashboard/colors/block/${item.id}`}
                                        restoreRoute={`/dashboard/colors/restored/${item.id}`}
                                        item = {item}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
