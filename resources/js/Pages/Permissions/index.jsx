import ActionButtons from "@/Components/ActionButtons";
import Dropdown from "@/Components/Dropdown";
import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function YachtSizes({ permissions }) {
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
                title={"Permissions"}
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
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Guard Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Have Permission
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3 text-end">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions?.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}

                        {permissions?.map((permission, index) => (
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
                                <td className="px-6 py-4">{permission.name}</td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">
                                    {permission.have_permission}
                                </td>
                                <td className="px-6 py-4">
                                    {permission.created_at}
                                </td>
                                <td className="px-6 py-4 flex justify-end">
                                    <ActionButtons
                                        editRoute={`/dashboard/permissions/edit/${permission.id}`}
                                        deleteRoute={`/dashboard/permissions/delete/${permission.id}`}
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
