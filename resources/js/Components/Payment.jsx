// resources/js/Components/Modal.js
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from './TextField';
import SubmitButton from './SubmitButton';
import toast from "react-hot-toast"

const Payment = ({ ModelStatus,onClose, booking,updateModelOpen }) => {
    if (!ModelStatus) return null;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();


    const onSubmit = (data) => {

        router.post("/dashboard/bookings/complete/"+booking.id,data);
        updateModelOpen(false);
        toast.success('Payment updated for booking successfully');
    };
    const toJSONLocal = (date)=> {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);

      }

    //   flex justify-between h-12 items-center px-2 text-white bg-primary rounded-lg
    // ${isApproved ? "visible" : "hidden"}
    return (
        <div className={` grid  top-0 inset-0  bg-gray-900 bg-opacity-50  mt-2 mb-2 ${ModelStatus ? "" : "hidden"}`}>
            <div  className='bg-white p-6 rounded shadow-lg absolute top-0 left-0 top-20 justify-center ml-[400px] w-1/2'
              >
                <button onClick={onClose} className="absolute top-8 text-white right-0 mr-12 mr-8  text-2xl ">
                   &times;
                </button>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-center text-2xl text-bold text-white bg-primary rounded-lg p-2'>Add Payment for Booking</h1>
                    <Controller
                        name="payment"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <TextField {...field} control={control} />
                        )}
                    />
                    <Controller
                        name="deposit"
                        defaultValue={parseInt(booking.vehicle.depositfee)}
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <TextField {...field} control={control} />
                        )}
                    />

                    <Controller
                        name="total amount"
                        control={control}
                        defaultValue={booking.vehicle?.total}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <TextField {...field} control={control} />
                        )}
                    />

                    <Controller
                        name="date"
                        defaultValue={toJSONLocal(new Date())}
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <TextField {...field} control={control} />
                        )}
                    />
                    <SubmitButton
                        label="Generate Invoice"
                        isSubmitting={isSubmitting}
                        className="mb-12"
                    />

                </form>

            </div>
        </div >
    );
};

export default Payment;
