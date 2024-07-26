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
        router.post("/dashboard/yachtsize/store", data);
    };

    const yachtTypes = [
        { value: "Ft", label: "Ft" },
        { value: "M", label: "M" },
    ];


    useEffect(() => {
        if (errors && errors.success) {
            //reset form //
            reset();
            toast.success(errors.success);
        }
    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={"Create Yacht Size"} />
            <div className="flex justify-center mt-5">
                <div className="xl:w-3/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="size"
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
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    control={control}
                                    options={yachtTypes}
                                />
                            )}
                        />

                        <SubmitButton
                            label="Save Yacht Size"
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
