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
import RichTextEditor from "@/Components/RichTextEditor";

export default function Edit({ category }) {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        router.post(`/dashboard/categories/update/${category.id}`, data);
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
            <TopMenu title={"Update Category"} />
            <div className="flex justify-center mt-5">
                <div className="xl:w-3/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                            name="name"
                            defaultValue={category.name}
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />


                <Controller
                defaultValue={category.note}
                            name="note"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <RichTextEditor
                                    name={field.name}
                                    control={control}
                                    defaultValue={field.value}
                                />
                            )}
                        />

                        <Controller
                        defaultValue={category.description}
                            name="description"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <RichTextEditor
                                    name={field.name}
                                    control={control}
                                    defaultValue={field.value}
                                />
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
                         defaultValue={category.status.slice(0,1).toUpperCase()+ category.status.slice(1)}
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
                            label="Update Category"
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
