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

export default function Create({ rolesmain }) {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        router.post("/dashboard/users/store", data);
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
            <TopMenu title={"Create User"} />
            <div className="flex justify-center mt-5">
                <div className="xl:w-3/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
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
                            name="password"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    control={control}
                                    type="password"
                                />
                            )}
                        />

                        <Controller
                            name="role"
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
                            label="Save User"
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
