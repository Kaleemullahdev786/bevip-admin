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
import TextFile from "@/Components/TextFile";

export default function Edit({ type }) {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        router.post(`/dashboard/types/update/${type.id}`, data);
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
        else if (errors && errors.status) {
            //reset form //
            toast.success(errors.status);
        }
        else if (errors && errors["icon"]) {
            toast.error(errors["icon"]);
        }

    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={"Update Type"} />
            <div className="flex justify-center mt-5">
                <div className="xl:w-3/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                            name="name"
                            defaultValue={type.displayname}
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                    <Controller
                            name="type"
                            defaultValue={type.vehicletype}
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                    <Controller
                            name="seats"
                            defaultValue={type.seats}
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />
                        <Controller
                            name="doors"
                            defaultValue={type.noofdoor}
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />
                        <Controller
                            name="icon"
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({ field }) => (
                                <TextFile {...field} control={control} />
                            )}
                        />


                       <Controller
                         defaultValue={type.status.slice(0,1).toUpperCase()+ type.status.slice(1)}
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
                            label="Update Type"
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
