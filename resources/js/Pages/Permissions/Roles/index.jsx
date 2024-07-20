import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import ActionButtons from "@/Components/ActionButtons";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Permissions({ roles }) {
    const { errors } = usePage().props;
    useEffect(() => {
        if (errors && errors.success) {
            toast.success(errors.success);
        }
    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu
                title={"Roles"}
                link={"/dashboard/roles/create"}
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
                                Permissions
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
                        {roles?.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}
                        {roles?.map((role, index) => (
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
                                <td className="px-6 py-4">{role.name}</td>
                                <td className="px-6 py-4">{role.guard_name}</td>
                                <td className="px-6 py-4">
                                    <Link
                                        className="text-secondary p-1 border-b-2 border-b-lightgray transition-all hover:border-primary"
                                        href={`/dashboard/roles/permissions/${role.id}`}
                                    >
                                        View Permissions
                                    </Link>
                                </td>
                                <td className="px-6 py-4">{role.created_at}</td>
                                <td className="px-6 py-4 text-end">
                                    <ActionButtons
                                        editRoute={`/dashboard/roles/edit/${role.id}`}
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
