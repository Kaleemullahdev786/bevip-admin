// resources/js/Components/Modal.js
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from './TextField';
import SubmitButton from './SubmitButton';
import toast from "react-hot-toast"
import RichTextEditor from './RichTextEditor';

const CancelBooking = ({ ModelStatus1,onClose1, booking1,updateModelOpen1 }) => {
    if (!ModelStatus1) return null;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();


    const onSubmit = (data) => {

        router.post("/dashboard/bookings/cancelled/"+booking1.id,data);
        updateModelOpen1(false);
        toast.success('Booking  Cancelled successfully');
    };
    const toJSONLocal = (date)=> {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);

      }


    // ${isApproved ? "visible" : "hidden"}
    return (
        <div className={` grid  top-0 inset-0  bg-gray-900 bg-opacity-50  mt-2 mb-2 ${ModelStatus1 ? "" : "hidden"}`}>
            <div  className='bg-white p-6 rounded shadow-lg absolute top-0 left-0 top-40 justify-center ml-[400px] w-1/2'  >
                <button onClick={onClose1} className="absolute top-8 right-0 mr-12 text-white  text-2xl ">
                   &times;
                </button>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-center text-2xl text-bold text-white bg-primary rounded-lg p-2 mb-4 '>Cancel Booking</h1>

                    <Controller
                        name="reason"
                        control={control}
                        defaultValue={booking1.vehicle?.total}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <RichTextEditor {...field} control={control} />
                        )}
                    />

                    <SubmitButton
                        label="Cancel Booking"
                        isSubmitting={isSubmitting}
                        className="mb-12"
                    />

                </form>

            </div>
        </div >
    );
};

export default CancelBooking;
