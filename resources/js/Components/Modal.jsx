// resources/js/Components/Modal.js
import { router } from '@inertiajs/react';
import React from 'react';
import FileDownloader from './FileDownloader';


const Modal = ({ isOpen, onClose, customer }) => {
    if (!isOpen) return null;
    // console.log(customer);
    const onSubmit = (booking_id) => {
        router.get("/dashboard/bookings/updatebooking/" + booking_id);
    };
    var urls = [
        'http://localhost/uploads/CarMedia/669f8b1dd2e80_bathroom_-_Copy.png',
        'http://localhost/uploads/CarMedia/669f8b1dd2e80_bathroom_-_Copy.png',
        'http://localhost/uploads/CarMedia/669f8b1dd2e80_bathroom_-_Copy.png'
    ];


    const downloadFUnction = (event,url,is_multiple) =>
            {
        event.preventDefault();
        if(is_multiple){
            for(let i=0;i<urls.length; i++){
                window.open(url[i]);
            }

        // window.open('http://localhost/uploads/CarMedia/669f8b1dd2e80_bathroom_-_Copy.png');
        // window.open('http://localhost/uploads/CarMedia/669f8b1dd2e80_bathroom_-_Copy.png');
        }else{
            window.open(url);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
            <div className="grid bg-white p-6 rounded shadow-lg">

                <form >

                <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700  ">
                <button onClick={onClose} className="relative bottom-6 flex flex-1 flex-row-reverse  ml-2 text-2xl  w-full">
                    &times;
                </button>
                        <div class="flex items-center justify-between mb-2">
                            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white"> Customer Details</h5>
                        </div>
                        <div class="flow-root" >

                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Bonnie image" />
                                        </div>
                                        <div class="flex-4 min-w-0 ms-4 m-12]">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Name
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                               Email
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400 mt-1">
                                                Phone
                                            </p>

                                        </div>
                                        <div class="flex-4 min-w-0 ms-4 ml-[100px] ">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {customer.name}
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {customer.email}
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400 mt-1">
                                                {customer.phone}
                                            </p>

                                        </div>

                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">

                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>


<ul className='flex nline-flex items-center text-base font-semibold text-gray-900 dark:text-white gap-2'>

    <li className='flex w-full justify-center rounded-md bg-primary px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' onClick={(event) => downloadFUnction(event,urls,true)}>Download All</li>
    {/* <FileDownloader urls={urls} label={'s'} is_multiple={true}/> */}
</ul>

<ul className='flex flex-col  items-center text-base font-semibold text-gray-900 dark:text-white gap-2 mt-4 justify-center'>

    <li className=''>License  <button type='button' onClick={(event) => downloadFUnction(event, 'http://localhost/uploads/CarMedia/669f8b1dd2e80_bathroom_-_Copy.png', false)} className='badge bg-primary px-1 py-1 font-semibold leading-6 text-white rounded ml-9'>Download</button> </li>
    <li className=''>Emirates ID  <button type='button' onClick={(event) => downloadFUnction(event, 'http://localhost/uploads/CarMedia/669f8b1dd2e80_bathroom_-_Copy.png', false)} className='badge bg-primary px-1 py-1 font-semibold leading-6 text-white rounded ml-2'>Download</button> </li>
    <li className=''>Passport  <button type='button' onClick={(event) => downloadFUnction(event, 'http://localhost/uploads/CarMedia/669f8b1dd2e80_bathroom_-_Copy.png', false)} className='badge bg-primary px-1 py-1 font-semibold leading-6 text-white rounded ml-7'>Download</button> </li>


</ul>


                    {/* <div className="h-128">
                            <div class="relative flex flex-col mt-16 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                                <h1 class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"> Driving license Front Id </h1>
                                <br></br>
                                <div
                                    class="relative h-56 mx-4 -mt-6 overflow-hidden text-wite shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                    <img
                                        src={customer.full_path}
                                        alt="Driving license Front ID" />
                                </div>
                            </div>

                            <div class="relative flex flex-col mt-16 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 mb-2">
                                <h1 className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300' > Driving license Back Id </h1>
                                <br></br>
                                <div
                                    class="relative h-56 mx-4 -mt-6 overflow-hidden text-wite shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                    <img
                                        src={customer.full_path}
                                        alt="Driving license back ID" />
                                </div>
                            </div>
                        </div> */}
{/*
                        <div class="relative flex flex-col mt-16 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                            <h1> Passport Front Id </h1>
                            <div
                                class="relative h-56 mx-4 -mt-6 overflow-hidden text-wite shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                <img
                                    src={customer.full_path}
                                    alt="Passport Front ID" />
                            </div>
                        </div>

                        <div class="relative flex flex-col mt-16 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                            <h1> Passort Back Id </h1>
                            <div
                                class="relative h-56 mx-4 -mt-6 overflow-hidden text-wite shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                <img
                                    src={customer.full_path}
                                    alt="Passort back ID" />
                            </div>
                        </div> */}


                        {/* Passport  */}
                        {/* <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                            <h1> Front Id </h1>
                            <div
                                class="relative h-56 mx-4 -mt-6 overflow-hidden text-wite shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                <img
                                    src={customer.full_path}
                                    alt="Front ID" />
                            </div>
                        </div>

                        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                            <h1> Back Id </h1>
                            <div
                                class="relative h-56 mx-4 -mt-6 overflow-hidden text-wite shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                <img
                                    src={customer.full_path}
                                    alt="Back ID" />
                            </div>
                        </div> */}



                    </div>


        </form>
</div>
        </div >
  );
};

export default Modal;


// import React from 'react';

// const Modal = ({ isOpen, onClose, children,customer }) => {
//   if (!isOpen) return null;

// console.log(customer);
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 mt-12">
//       <div className="bg-white p-6 rounded shadow-lg mb-64">
//         <button onClick={onClose} className="absolute top-0 right-0 mt-3 mr-12 text-2xl">
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;
