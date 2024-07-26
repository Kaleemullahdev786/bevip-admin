import TextField from "@/Components/TextField";
import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { router, usePage } from "@inertiajs/react";
import SubmitButton from "@/Components/SubmitButton";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Statuses from "@/Components/Statuses";
import SelectField from "@/Components/SelectField";


export default function Create() {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        router.post("/dashboard/colors/store", data);
    };



    useEffect(() => {

        if (errors && errors.success) {
            //reset form //
            reset();
            toast.success(errors.success);
        }
        else if (errors && errors.color) {
            //reset form //
            toast.error(errors.color);
        }

        else if (errors && errors.code) {
            //reset form //
            toast.error(errors.code);
        }

        else if (errors && errors.status) {
            //reset form //
            toast.error(errors.status);
        }
    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={"Create Color"} />
            <div className="flex justify-center mt-5">
                <div className="xl:w-3/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="color"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                        <Controller
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
                            label="Save Color"
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
