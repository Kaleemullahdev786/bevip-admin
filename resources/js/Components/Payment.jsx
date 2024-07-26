// resources/js/Components/Modal.js
import { router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from './TextField';
import SubmitButton from './SubmitButton';


const Payment = ({ isOpen, onClose, isApproved, booking }) => {

    if (!isOpen) return null;

    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        router.post("/dashboard/bookings/bookings/complete",data);
    };
    const toJSONLocal = (date)=> {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
      }


    // ${isApproved ? "visible" : "hidden"}
    return (
        <div className={` grid  top-0 inset-0  bg-gray-900 bg-opacity-50  mt-2 mb-2 `}>
            <div className='bg-white p-6 rounded shadow-lg absolute top-[-150px] left-0 top-20 justify-center ml-[400px] w-1/2'>
                <button onClick={onClose} className="absolute top-0 right-0 mr-12 mr-4  text-2xl ">
                    &times;
                </button>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-center text-2xl text-bold'>Add Payment for Booking</h1>
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
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <TextField {...field} control={control} />
                        )}
                    />

                    <Controller
                        name="total_amount"
                        control={control}
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
