// resources/js/Pages/Customers.js
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Modal from '../Components/Modal';

const Customer = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 mt-12">
          <div className="bg-white p-6 rounded shadow-lg mb-64">
            <button onClick={onClose} className="absolute top-0 right-0 mt-3 mr-12 text-2xl">
              &times;
            </button>
            <form >

<div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white"> Customer Details</h5>
</div>
<div class="flow-root">

        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Bonnie image" />
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Neil Sims  {item.customer.last_name }
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 mt-1">
                            953489753489
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">

                    </div>
                </div>
            </li>
        </ul>
</div>
</div>
        <button type="button" className="bg-white hover:bg-gray-200 text-sm text-primary md:px-4 px-2 md:py-2 py-1 rounded-lg" onClick={()=>onSubmit(item.customer.id)} >Approved Status</button>
    </form>

          </div>
        </div>
  );
};

export default Customer;
