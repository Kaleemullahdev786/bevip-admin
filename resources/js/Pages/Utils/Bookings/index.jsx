import ActionButtons from "@/Components/ActionButtons";
import BookingActionButtons from "@/Components/BookingActionButtons";
import Dropdown from "@/Components/Dropdown";
import Modal from "@/Components/Modal";
import TextField from "@/Components/TextField";
import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import { usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Payment from "@/Components/Payment";
import Pagination from "@/Components/Pagination";
import Receipt from "@/Components/Receipt";

export default function Bookings({ bookings }) {
    const { errors } = usePage().props;
    //  const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [ModalPaymentOpen, setModalPaymentOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalReceiptOpen, setIsModalReceiptOpen] = useState(false);


    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [timers, setTimers] = useState(bookings.data.map((item1, i) => 0));
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    useEffect(() => {

        const interval = setInterval(() => {
            setTimers((prevTimers) =>
                prevTimers.map((timer) => (timer > 0 ? timer - 1 : 0))
            );
        }, 1000);

        return () => clearInterval(interval);

        if (errors && errors.success) {
            //reset form //
            toast.success(errors.success);

        }
    }, [errors, timers]);
    const sampleReceipt = {
        id: '123456',
        date: '2024-07-27T10:33:13Z',
        items: [
            { name: 'Item 1', price: 29.99 },
            { name: 'Item 2', price: 49.99 },
            { name: 'Item 3', price: 19.99 },
        ],
        total: 99.97,
        customer: {
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
    };



    const onSubmit = (booking_id) => {
        router.get("/dashboard/bookings/updatebooking/" + booking_id);
    };

    const ModalPaymentOpenDyn = () => {
        setModalPaymentOpen(true);
    };

    const closeModalPaymentDyn = () => {
        setModalPaymentOpen(false);

    };


    const ModalReceiptOpenDyn = () => {
        setModalReceiptOpen(true);
    };

    const closeModalReceiptDyn = () => {
        setModalReceiptOpen(false);

    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes == 0 && remainingSeconds == 0)
            return '';

        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    const openModal = (customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };




    // Getting seconds differences
    function getTimeDifference(targetDateTime,i) {

        var current_time = new Date(formatDateToISO(new Date()));
        var created_at =new Date(formatDateToISO(new Date(targetDateTime))); // Specific date and time
        var  differenceInMilliseconds = created_at -  current_time;   // Current time - Created at
        var differenceInSeconds = 0;
        if (differenceInMilliseconds < 0) {
            return {
                differenceInSeconds
            };
        }

         differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
         //Setting time for each booking
        setTimers[i] = differenceInSeconds;
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        const differenceInHours = Math.floor(differenceInMinutes / 60);
        const differenceInDays = Math.floor(differenceInHours / 24);
        const seconds = differenceInSeconds % 60;
        const minutes = differenceInMinutes % 60;
        const hours = differenceInHours % 24;
        const days = differenceInDays;

        return {
            days,
            hours,
            minutes,
            seconds,
            differenceInSeconds
        };
    }

    // changing format of time
    function formatDateToISO(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }


    //  Show Timer enable or not
    function showtimer(created_at,i,item){
        var ride_status = item.metas[2].value;
        var newtime = created_at;
        var current_time = formatDateToISO(new Date());
        created_at = new Date(created_at.replace(' ', 'T'));
        created_at.setMinutes(created_at.getMinutes() + 2);
        var add = formatDateToISO(created_at);
        created_at = new Date(add);
        current_time = new Date(current_time);

          if(created_at > current_time && item.is_confirmed === 0)
          {

           return true;
          }
          else{

            return false;
          }

    }

    // Get random number between min and max
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // console.log(bookings[0]);
    return (
        <DashboardLayout>
            <TopMenu
                title={"Bookings"}
                link={"/dashboard/bookings/create"}
                linkText={"Add New"}
            />
            {/* overflow-x-auto */}
            <div className=" relative  sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-lightergray">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Vehicle
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Drop-off address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pickup address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pickup date & time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Drop-off date & time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Passengers
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Booking Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount

                            </th>

                            <th scope="col" className="px-6 py-3 text-end">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.data?.length === 0 && (
                            <tr>
                                <td colSpan="12" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}

                        {bookings.data?.map((item, index) => (
                            <tr
                                className="odd:bg-white even:bg-gray-50"
                                key={index}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    {index + 1}
                                    <div className="timer">
                                        {showtimer(item.created_at,index,item) === true ?formatTime(getTimeDifference(item.created_at,index).differenceInSeconds):''}

                                    </div>
                                </th>
                                <td className="px-6 py-4 " onClick={() => openModal(item.customer)}> <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{item.customer.name}</span> </td>
                                <td className="px-6 py-4">{item.vehicle.carname}</td>
                                <td className="px-6 py-4">{item.dest_addr}</td>
                                <td className="px-6 py-4">{item.pickup_addr}</td>
                                <td className="px-6 py-4">{item.pickup}</td>
                                <td className="px-6 py-4">{item.dropoff}</td>
                                <td className="px-6 py-4">{item.travellers}</td>
                                <td className="px-6 py-4">{item.payment === 1 ? 'Paid' : 'Pending'}</td>

                                <td className="px-6 py-4">{item.metas[2].value} { item.metas[2].value=='Cancelled' ? (<div dangerouslySetInnerHTML={{ __html: item.metas[17].value}}></div>) : (' ') }</td>
                                <td className="px-6 py-4">{item.tax_total}
                                    <Modal isOpen={isModalOpen} onClose={closeModal} customer={selectedCustomer} />

                                </td>

                                <td className="px-6 py-4 flex justify-end">
                                    <BookingActionButtons
                                        editRoute={`/dashboard/bookings/edit/${item.id}`}
                                        deleteRoute={`/dashboard/bookings/delete/${item.id}`}
                                        journeyRoute={`/dashboard/bookings/payment/complete-journey/${item.id}`}
                                        restoreRoute={`/dashboard/bookings/restored/${item.id}`}
                                        receiptRoute={`/`}
                                        generateRoute={`/`}
                                        cancelRoute={`/dashboard/bookings/cancelled/${item.id}`}
                                        makePayRoute={`/dashboard/bookings/payment/make-payment/${item.id}`}
                                        MakePaymentRoute={`/`}
                                        item={item}
                                    />
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <Payment
                 isOpen={ModalPaymentOpen}  onClose={closeModalPaymentDyn}
                /> */}

                  <div className="flex flex-row-reverse">
                  <Pagination links = {bookings.links}  />
                  </div>
            </div>
        </DashboardLayout>
    );
}
