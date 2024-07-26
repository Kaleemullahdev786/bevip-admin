import ActionButtons from "@/Components/ActionButtons";
import BookingActionButtons from "@/Components/BookingActionButtons";
import Dropdown from "@/Components/Dropdown";
import Modal from "@/Components/Modal";
import TextField from "@/Components/TextField";
import TopMenu from "@/Components/TopMenu";
import DashboardLayout from "@/Pages/Layouts/DashboardLayout";
import { usePage,router } from "@inertiajs/react";
import { useEffect,useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Payment from "@/Components/Payment";

export default function Bookings({ bookings }) {
    const { errors } = usePage().props;
//  const [selectedCustomer, setSelectedCustomer] = useState(null);
const [ModalPaymentOpen, setModalPaymentOpen] = useState(false);
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const onSubmit = (booking_id) => {

        router.get("/dashboard/bookings/updatebooking/"+booking_id);
    };





  const ModalPaymentOpenDyn = () => {
    setModalPaymentOpen(true);
  };

  const closeModalPaymentDyn = () => {
    setModalPaymentOpen(false);

  };

    useEffect(() => {



        if (errors && errors.success) {
            //reset form //
            toast.success(errors.success);

        }
    }, [errors]);


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


//   const onSubmit = (id) => {
//     // router.post("/dashboard/yachtsize/store", data);
//     // event.preventDefault();
//         alert(id)
// };
//   const handleSubmit = (event,id) => {
//     event.preventDefault();
//     alert(id)
//     // Handle form submission with Inertia.post or other methods
//     // Inertia.post('/submit-form', formData);
//     closeModal();
//   };


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
                        {bookings?.length === 0 && (
                            <tr>
                                <td colSpan="12" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}

                        {bookings?.map((item, index) => (
                            <tr
                                className="odd:bg-white even:bg-gray-50"
                                key={index}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4 " onClick={() => openModal(item.customer)}> <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{item.customer.first_name}</span> </td>
                                <td className="px-6 py-4">{item.vehicle.carname}</td>
                                <td className="px-6 py-4">{item.dest_addr}</td>
                                <td className="px-6 py-4">{item.pickup_addr}</td>
                                <td className="px-6 py-4">{item.pickup}</td>
                                <td className="px-6 py-4">{item.dropoff}</td>
                                <td className="px-6 py-4">{item.travellers}</td>
                                <td className="px-6 py-4">{item.payment === 1 ?'Paid':'Pending'}</td>
                                <td className="px-6 py-4">{item.status== 1 ? 'completed':'Upcoming'}</td>
                                <td className="px-6 py-4">{item.tax_total}

                                {/* <button type="button"  className="bg-white hover:bg-gray-200 text-sm text-primary md:px-4 px-2 md:py-2 py-1 rounded-lg"  >Approved Status</button> */}
                                <Modal isOpen={isModalOpen} onClose={closeModal} customer={selectedCustomer} />

                                </td>

                                <td className="px-6 py-4 flex justify-end">
                                    <BookingActionButtons
                                        editRoute={`/dashboard/bookings/edit/${item.id}`}
                                        deleteRoute={`/dashboard/bookings/delete/${item.id}`}
                                        blockRoute={`/dashboard/bookings/block/${item.id}`}
                                        restoreRoute={`/dashboard/bookings/restored/${item.id}`}
                                        item = {item}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <Payment
                 isOpen={ModalPaymentOpen}  onClose={closeModalPaymentDyn}
                /> */}
            </div>
        </DashboardLayout>
    );
}
