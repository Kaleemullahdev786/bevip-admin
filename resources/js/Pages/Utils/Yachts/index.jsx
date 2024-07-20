import ActionButtons from "@/Components/ActionButtons";
import Dropdown from "@/Components/Dropdown";
import Tags from "@/Components/Tags";
import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Yachts({ yachts }) {
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
                title={"Yachts"}
                link={"/dashboard/yachts/create"}
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
                                Short Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-end">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {yachts?.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}

                        {yachts?.map((item, index) => (
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
                                <td className="px-6 py-4">{item.short_description}</td>
                                <td className="px-6 py-4">
                                    <img
                                        src={item.profile_image}
                                        alt={item.profile_image}
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Tags type={item.status.toLowerCase()} />
                                </td>
                                <td className="px-6 py-4 flex justify-end">
                                    <ActionButtons
                                        editRoute={`/dashboard/yachts/edit/${item.id}`}
                                        deleteRoute={`/dashboard/yachts/delete/${item.id}`}
                                        blockRoute={`/dashboard/yachts/block/${item.id}`}
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
