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
import TextFile from "@/Components/TextFile";
import RichTextEditor from "@/Components/RichTextEditor";


export default function Create({manufacturers,types,brand_models,catagories,colors,features}) {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        router.post("/dashboard/vehicles/store", data);
    };

    const engine_type = [
        { value: "Petrol", label: "Petrol" },
        { value: "Diesel", label: "Diesel" },
    ];

    const gear_type = [
        { value: "Automatic", label: "Automatic" },
        { value: "Manual", label: "Manual" },
    ];

    useEffect(() => {

        if (errors && errors.success) {
            //reset form //
            reset();
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
        else if (errors && errors["banner"]) {
            toast.error(errors["banner"]);
        }
        else if (errors && errors.nos) {
            //reset form //
            toast.success(errors.nos);
        }

        else if (errors && errors.nod) {
            //reset form //
            toast.success(errors.nod);
        }

        else if (errors && errors.horse_power) {
            //reset form //
            toast.success(errors.horse_power);
        }
        else if (errors && errors.license_plate) {
            //reset form //
            toast.success(errors.license_plate);
        }
        else if (errors && errors.gear_type) {
            //reset form //
            toast.success(errors.gear_type);
        }
        else if (errors && errors.engine_type) {
            //reset form //
            toast.success(errors.engine_type);
        }
        else if (errors && errors.manufacturer_id) {
            //reset form //
            toast.success(errors.manufacturer_id);
        }
        else if (errors && errors.type_id) {
            //reset form //
            toast.success(errors.type_id);
        }
        else if (errors && errors.color_id) {
            //reset form //
            toast.success(errors.color_id);
        }
        else if (errors && errors.all_features) {
            //reset form //
            toast.success(errors.all_features);
        }
        else if (errors && errors.brand_model_id) {
            //reset form //
            toast.success(errors.brand_model_id);
        }
        else if (errors && errors.category_id) {
            //reset form //
            toast.success(errors.category_id);
        }
        else if (errors && errors.luggage) {
            //reset form //
            toast.success(errors.luggage);
        }
        else if (errors && errors.lic_exp_date) {
            //reset form //
            toast.success(errors.lic_exp_date);
        }
        else if (errors && errors.reg_exp_date) {
            //reset form //
            toast.success(errors.reg_exp_date);
        }
        else if (errors && errors.extra_charges) {
            //reset form //
            toast.success(errors.extra_charges);
        }
        else if (errors && errors.deposit_fee) {
            //reset form //
            toast.success(errors.deposit_fee);
        }
        else if (errors && errors.discount) {
            //reset form //
            toast.success(errors.discount);
        }
        else if (errors && errors.banner) {
            //reset form //
            toast.success(errors.banner);
        }
        else if (errors && errors.video_option) {
            //reset form //
            toast.success(errors.video_option);
        }
        else if (errors && errors.gallary) {
            //reset form //
            toast.success(errors.gallary);
        }

        else if (errors && errors.car_description) {
            //reset form //
            toast.success(errors.car_description);
        }

    }, [errors]);

    return (
        <DashboardLayout>
            <TopMenu title={"Create Vehicle"} />
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
                            name="seats"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />





                         <Controller
                            name="horse power"
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
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />


                        <Controller
                            name="license plate"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                        <Controller
                            name="year"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />


                            <Controller

                            name="engine type"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    control={control}
                                    options={engine_type}
                                />
                            )}
                            />


                            <Controller

                            name="gear type"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    control={control}
                                    options={gear_type}
                                />
                            )}
                            />


                          <Controller

                                name="manufacturer"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <SelectField
                                        {...field}
                                        control={control}
                                        options={manufacturers}
                                    />
                                )}
                                />

                                <Controller

                                name="models"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <SelectField
                                        {...field}
                                        control={control}
                                        options={brand_models}
                                    />
                                )}
                                />


                                <Controller

                                name="color"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <SelectField
                                        {...field}
                                        control={control}
                                        options={colors}
                                    />
                                )}
                                />


                                <Controller

                                name="features"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <SelectField
                                        {...field}
                                        control={control}
                                        options={features}
                                        multiple={true}
                                    />
                                )}
                                />


                                <Controller

                                name="category"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <SelectField
                                        {...field}
                                        control={control}
                                        options={catagories}
                                    />
                                )}
                                />

                                <Controller

                                name="type"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <SelectField
                                        {...field}
                                        control={control}
                                        options={types}
                                    />
                                )}
                                />
                            <Controller
                            name="luggage"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />
                        <Controller
                            name="lic exp date"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                       <Controller
                            name="reg exp date"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />


                        <Controller
                            name="extra charges"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />

                        <Controller
                            name="deposit fee"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />


                        <Controller
                            name="discount"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField {...field} control={control} />
                            )}
                        />




<Controller
                            name="banner"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextFile {...field} control={control} />
                            )}
                        />
                        <Controller
                            name="video option"
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({ field }) => (
                                <TextFile {...field} control={control} />
                            )}
                        />
                        <Controller
                            name="gallary"
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({ field }) => (
                                <TextFile {...field} control={control} />
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
                     <Controller
                            name="car description"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <RichTextEditor
                                    name={field.name}
                                    control={control}
                                    defaultValue={field.value}
                                /> )}
                                />

                </div>
                        <SubmitButton
                            label="Save Vehicle"
                            isSubmitting={isSubmitting}
                        />

                    </form>

                </div>
            </div>
        </DashboardLayout>
    );
}
