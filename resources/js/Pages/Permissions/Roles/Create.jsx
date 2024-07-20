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

export default function Create() {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        router.post("/dashboard/roles/store", data);
    };

    useEffect(() => {
        if (errors && errors.success) {
            //reset form //
            reset();
            toast.success(errors.success);
        } else if (errors && errors.role) {
            toast.error(errors.role);
        } else if (errors && errors.error) {
            toast.error(errors.error);
        }
    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={"Create Role"} />
            <div className="flex justify-center mt-5">
                <div className="xl:w-3/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="role"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                        <SubmitButton
                            label="Save Role"
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
