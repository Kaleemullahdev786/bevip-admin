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
import TextFile from "@/Components/TextFile";
import RichTextEditor from "@/Components/RichTextEditor";
import Countries from "@/Components/Countries";
import Statuses from "@/Components/Statuses";


export default function Create({
    emenities,
    freeutils,
    bedrooms,
    yachtsizes,
    crewmembers,
}) {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        register,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        router.post("/dashboard/yachts/store", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    useEffect(() => {
        if (errors && errors.success) {
            //reset form //
            reset();
            toast.success(errors.success);
        } else if (errors && errors.name) {
            toast.error(errors.name);
        } else if (errors && errors.short_description) {
            toast.error(errors.short_description);
        } 
        else if (errors && errors.long_description) {
            toast.error(errors.long_description);
        } 
        else if (errors && errors.anemities) {
            toast.error(errors.anemities);
        } 
        else if (errors && errors.free_utils) {
            toast.error(errors.free_utils);
        } 
        else if (errors && errors.name) {
            toast.error(errors.name);
        } 
        else if (errors && errors.menufacturer_country) {
            toast.error(errors.menufacturer_country);
        } 
        else if (errors && errors.location) {
            toast.error(errors.location);
        } 
        else if (errors && errors.profile_image) {
            toast.error(errors.profile_image);
        } 
        else if (errors && errors.policy) {
            toast.error(errors.policy);
        } 
        else if (errors && errors.crew_members) {
            toast.error(errors.crew_members);
        } 
        else if (errors && errors.bathrooms) {
            toast.error(errors.bathrooms);
        } 
        else if (errors && errors.price) {
            toast.error(errors.price);
        } 
        else if (errors && errors.status) {
            toast.error(errors.status);
        } 

        else if (errors && errors["image.0"]) {
            toast.error(errors["image.0"]);
        } 

        else if (errors && errors["image_3d.0"]) {
            
            toast.error(errors["image_3d.0"]);
        } 

        else if (errors && errors["gallery.0"]) {
            toast.error(errors["gallery.0"]);
        } 
        
        else if (errors && errors.error) {
            toast.error(errors.error);
        }
    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={"Create Yacht"} />
          
            <div className="flex flex-col-2 justify-center mt-5">
                <div className="xl:w-5/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="grid grid-cols-3 gap-4 p-4">
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
                            name="anemities"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    control={control}
                                    options={emenities}
                                    multiple={true}
                                />
                            )}
                        />

                        <Controller
                            name="bedrooms"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    control={control}
                                    options={bedrooms}
                                />
                            )}
                        />

                        <Controller
                            name="Crew"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    control={control}
                                    options={crewmembers} multiple={true}
                                />
                            )}
                        />

                        <Controller
                            name="freeutils"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    control={control}
                                    options={freeutils}
                                    multiple={true}
                                />
                            )}
                        />

                        <Controller
                            name="Size"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    control={control}
                                    options={yachtsizes}
                                />
                            )}
                        />
                    <Controller
                            name="Manufacturer"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    control={control}
                                    options={Countries}
                                />
                            )}
                        />
                        <Controller
                            name="price"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />
                        <Controller
                            name="Status"
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

                        <Controller
                            name="location"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />
                        <Controller
                            name="image"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextFile {...field} control={control} />
                            )}
                        />
                        <Controller
                            name="image 3d"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextFile {...field} control={control} />
                            )}
                        />

                        <Controller
                            name="gallery"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextFile
                                    {...field}
                                    control={control}
                                    multiple={true}
                                />
                            )}
                        />
                        <Controller
                            name="short_description"
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
                            name="long_description"
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
                            name="Policy"
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


 </div>
                        <SubmitButton
                            label="Save FreeUtils"
                            i
                            sSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
           
        </DashboardLayout>
    );
}
