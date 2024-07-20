import SubmitButton from "@/Components/SubmitButton";
import TextField from "@/Components/TextField";
import { Link, Head, usePage } from "@inertiajs/react";
import { Controller, useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Welcome({ auth }) {
    const { errors } = usePage().props;

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        router.post("/login", data);
    };

    if (errors && errors.email) {
        toast.error(errors.email);
    }
    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
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
                        </div>

                        <div>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <TextField {...field} control={control} />
                                )}
                            />
                        </div>

                        <div>
                            <SubmitButton
                                isLoading={isSubmitting}
                                label="Sign in"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
