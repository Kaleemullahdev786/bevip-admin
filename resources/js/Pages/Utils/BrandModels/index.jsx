import ActionButtons from "@/Components/ActionButtons";
import Dropdown from "@/Components/Dropdown";
import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function YachtSizes({ yachtSizes }) {
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
                title={"Yacht Sizes"}
                link={"/dashboard/yachtsize/create"}
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
                                Size
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
                        {yachtSizes?.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}

                        {yachtSizes?.map((size, index) => (
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
                                <td className="px-6 py-4">{size.size}</td>
                                <td className="px-6 py-4">{size.sizein}</td>
                                <td className="px-6 py-4 flex justify-end">
                                    <ActionButtons
                                        editRoute={`/dashboard/yachtsize/edit/${size.id}`}
                                        deleteRoute={`/dashboard/yachtsize/delete/${size.id}`}
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
