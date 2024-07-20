import TextField from "@/Components/TextField";
import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { router, usePage } from "@inertiajs/react";
import SubmitButton from "@/Components/SubmitButton";
import SelectField from "@/Components/SelectField";
import toast from "react-hot-toast";
import { useEffect } from "react";
import ToggleButton from "@/Components/ToggleButton";

export default function Edit({ rolesmain, user, permissions }) {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        router.post(`/dashboard/users/update/${user.id}}`, data);
    };

    useEffect(() => {
        if (errors && errors.success) {
            //reset form //
            reset();
            toast.success(errors.success);
        }
    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={"Update User"} />
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            defaultValue={user.name}
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                        <Controller
                            name="email"
                            defaultValue={user.email}
                            control={control}
                            rules={{
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email",
                                },
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                        <Controller
                            name="role"
                            defaultValue={user.role}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    control={control}
                                    options={rolesmain}
                                />
                            )}
                        />

                        <SubmitButton
                            label="Update User"
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
                <div>
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
                                </tr>
                            </thead>
                            <tbody>
                                {permissions?.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-4"
                                        >
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
                                        <td className="px-6 py-4">
                                            {permission.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {permission.guard_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* {permission.have_permission ? "Yes" : "No"} */}
                                            <ToggleButton
                                                updateUrl={`/dashboard/users/permissions/${user.id}/${permission.id}`}
                                                id={permission.id}
                                                isChecked={
                                                    permission.have_permission
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
