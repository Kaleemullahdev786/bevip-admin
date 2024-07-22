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
import Statuses from "@/Components/Statuses";

export default function Edit({ color }) {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        router.post(`/dashboard/colors/update/${color.id}`, data);
    };



    useEffect(() => {
        if (errors && errors.success) {
            //reset form //
            toast.success(errors.success);
        }

        else if (errors && errors.name) {
            //reset form //
            toast.success(errors.name);
        }

        else if (errors && errors.code) {
            //reset form //
            toast.success(errors.code);
        }

        else if (errors && errors.status) {
            //reset form //
            toast.success(errors.status);
        }

    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={"Update Color"} />
            <div className="flex justify-center mt-5">
                <div className="xl:w-3/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                            name="name"
                            defaultValue={color.name}
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                        <Controller
                         defaultValue={color.code}
                            name="code"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                       <Controller
                      defaultValue={color.status}
                       name="status"
                       control={control}
                       rules={{
                           required: true,
                       }}
                       render={({ field }) => (
                           <SelectField
                               {...field}
                               control={control}
                               options={Statuses}
                           />
                       )}
                   />

                        <SubmitButton
                            label="Update Color"
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
