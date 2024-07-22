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

export default function Edit({ brand_model,manufactuers}) {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        router.post(`/dashboard/brand_models/update/${brand_model.id}`, data);
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
        else if (errors && errors.manufacurer_id) {
            toast.error(errors.manufacurer_id);
        }

    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={"Update Models"} />
            <div className="flex justify-center mt-5">
                <div className="xl:w-3/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                            name="name"
                            defaultValue={brand_model.name}
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />


                    <Controller
                        defaultValue={brand_model.manufacturer.id}
                       name="manufacturer"
                       control={control}
                       rules={{
                           required: true,
                       }}
                       render={({ field }) => (
                           <SelectField
                               {...field}
                               control={control}
                               options={manufactuers}
                           />
                       )}
                   />
                       <Controller
                      defaultValue={brand_model.status.slice(0,1).toUpperCase()+ brand_model.status.slice(1)}
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
                            label="Update Model"
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
