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

export default function Edit({ vehicle,manufacturers,types,brand_models,catagories,colors,features }) {
    const { errors } = usePage().props;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        router.post(`/dashboard/vehicles/update/${vehicle.id}`, data);
    };

    // console.log(vehicle.status.slice(0,1).toUpperCase()+ vehicle.status.slice(1));
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
            <TopMenu title={"Update Vehicle"} />
            <div className="flex justify-center mt-5">
                <div className="xl:w-3/6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="grid grid-cols-3 gap-4 p-4">

                            <Controller
                            defaultValue={vehicle.name}
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
                            defaultValue={vehicle.nos}
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
                            defaultValue={vehicle.horse_power}
                                name="horse_power"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <TextField {...field} control={control} />
                                )}
                            />




                            <Controller
                            defaultValue={vehicle.nod}
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
                            defaultValue={vehicle.license_plate}
                                name="license_plate"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <TextField {...field} control={control} />
                                )}
                            />

                            <Controller
                            defaultValue={vehicle.year}
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
                            defaultValue={vehicle.engine_type}

                                name="engine_type"
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
                            defaultValue={vehicle.gear_type}

                                name="gear_type"
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
                            defaultValue={vehicle.manufacturer_id}

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
                            defaultValue={vehicle.brand_model_id}

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
                            defaultValue={vehicle.color_id}

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
                            defaultValue={vehicle.category_id}

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
                            defaultValue={vehicle.type_id}

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
                            defaultValue={vehicle.luggage}
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
                            defaultValue={vehicle.lic_exp_date}
                                name="lic_exp_date"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <TextField {...field} control={control} />
                                )}
                            />

                            <Controller
                            defaultValue={vehicle.reg_exp_date}
                                name="reg_exp_date"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <TextField {...field} control={control} />
                                )}
                            />


                            <Controller
                            defaultValue={vehicle.extrakmfee}
                                name="extra_charges"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <TextField {...field} control={control} />
                                )}
                            />

                            <Controller
                            defaultValue={vehicle.depositfee}
                                name="deposit_fee"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <TextField {...field} control={control} />
                                )}
                            />


                            <Controller
                            defaultValue={vehicle.discount}
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
                                    required: false,
                                }}
                                render={({ field }) => (
                                    <TextFile {...field} control={control} />
                                )}
                            />
                            <Controller
                                name="video_option"
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
                              defaultValue={vehicle.status.slice(0,1).toUpperCase()+ vehicle.status.slice(1) }

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
                            defaultValue={vehicle.car_description}
                                name="car_description"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <RichTextEditor
                                        name={field.name}
                                        control={control}
                                        defaultValue={field.value}
                                    />)}
                            />

                        </div>
                        <SubmitButton
                            label="Update Vehicle"
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
