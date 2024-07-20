import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import ActionButtons from "@/Components/ActionButtons";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ToggleButton from "@/Components/ToggleButton";

export default function Permissions({ role, permissionsall }) {
    const { errors } = usePage().props;
    useEffect(() => {
        if (errors && errors.success) {
            toast.success(errors.success);
        }
    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={`${role.name} Permissions`} />
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
                        </tr>
                    </thead>
                    <tbody>
                        {permissionsall?.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}
                        {permissionsall?.map((permission, index) => (
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
                                <td className="px-6 py-4">
                                    {permission.guard_name}
                                </td>
                                <td className="px-6 py-4">
                                    {/* {permission.have_permission ? "Yes" : "No"} */}
                                    <ToggleButton
                                        updateUrl={`/dashboard/roles/permissions/${role.id}/${permission.id}`}
                                        id={permission.id}
                                        isChecked={permission.have_permission}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    {permission.created_at}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
