import React from 'react';
import { useForm } from 'react-hook-form';

const Receipt = ({ updateModelOpen,onClose,receipt }) => {
    // const { id, date, items, total, customer } = receipt;
    if (!updateModelOpen) return null;
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
        <div className="grid bg-white p-6 rounded shadow-lg">

            <form >

            <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700  ">
            <button onClick={onClose} className="relative bottom-6 flex flex-1 flex-row-reverse  ml-2 text-2xl  w-full">
                &times;
            </button>

        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Receipt</h2>
                <p className="text-gray-600">Receipt ID: {receipt.id}</p>
                <p className="text-gray-600">Date: {new Date(receipt.created_at).toLocaleDateString()}</p>
            </div>
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p className="text-gray-600">Name: {receipt.customer.name}</p>
                <p className="text-gray-600">Email: {receipt.customer.email}</p>
            </div>
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Items</h3>
                <ul>
                    {/* {items.map((item, index) => (
                        <li key={index} className="flex justify-between text-gray-600 py-2">
                            <span>{item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                        </li>
                    ))} */}
                </ul>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">Total</h3>
                <p className="text-2xl font-bold">${receipt.delivery_amount}</p>
            </div>
        </div>
        </div>
        </form>
        </div>
        </div>
    );
};

export default Receipt;
