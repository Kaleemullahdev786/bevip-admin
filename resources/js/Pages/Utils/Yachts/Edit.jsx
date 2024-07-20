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

export default function Edit({ yacht,emenities,
    freeutils,
    bedrooms,
    yachtsizes,
    crewmembers,
formated_emenities,
formated_freeutils,
formated_crewmembers
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
        router.post(`/dashboard/yachts/update/${yacht.id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    const handleClick =  (id) => {
        
        var is_delete =   window.confirm("Are you sure to want to delete");
        if(is_delete){
            router.get(`/dashboard/yachts/gallary/delete/`+id);
        }
        

      };

console.log(formated_crewmembers);
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
        
        else if (errors && errors.image_delete) {
            toast.success(errors.image_delete);
        } 
        
        

        else if (errors && errors.error) {
            toast.error(errors.error);
        }
    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={"Update Yacht"} />
            <div className="flex flex-col-2 justify-center mt-5">
                <div className="xl:w-5/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="grid grid-cols-3 gap-4 p-4">
                        <Controller
                         defaultValue={yacht.name}
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
                            // defaultValue={formated_emenities}
                            
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
                        //  defaultValue={yacht.bedrooms}
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
                            // defaultValue={formated_crewmembers}
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
                            // defaultValue={formated_freeutils}
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
                            // defaultValue={yacht.size}
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
                            // defaultValue={yacht.menufacturer_country}
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
                            defaultValue={yacht.price}
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
                            // defaultValue={yacht.status.slice(0,1).toUpperCase()+ yacht.status.slice(1) }
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
                        defaultValue={yacht.location}
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
                                required: false,
                            }}
                            render={({ field }) => (
                                <TextFile {...field} control={control} />
                            )}
                        />

                            {/* <img
                                        src={yacht.profile_image}
                                        alt={yacht.name}
                                        className="w-10 h-10 object-cover rounded-full"
                                    /> */}
                        <Controller
                            name="image 3d"
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({ field }) => (
                                <TextFile {...field} control={control} />
                            )}
                        />
                             
                             {/* <div className="flex gap-4">
                                   <img
                                        src={yacht.image_3d}
                                        alt={yacht.name}
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                    </div> */}
                        <Controller
                            name="gallery"
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({ field }) => (
                                <TextFile
                                    {...field}
                                    control={control}
                                    multiple={true}
                                />
                            )}
                        />

                        <div className="flex gap-4 mt-10">
                        {yacht.gallary?.map((gallary_image, index) => (
                        <img
                        src={gallary_image.image}
                        onClick={()=> handleClick(gallary_image.id)}
                        className="w-10 h-10 object-cover rounded-full"
                        />
                        ))}

                        </div>


                        <Controller
                            name="short_description"
                            defaultValue={yacht.short_description}
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
                            defaultValue={yacht.long_description}
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
                            defaultValue={yacht.policy}
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
                            label="update Yacht"
                            i
                            sSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
