import { Link, router } from "@inertiajs/react";

import { FiEdit, FiTrash, FiSlash, FiRepeat, FiEye, FiCheck, FiCheckSquare } from "react-icons/fi";

import Payment from "./Payment";
import { useState } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import CancelBooking from "./CancelBooking";
import Receipt from "./Receipt";

export default function BookingActionButtons({ editRoute, deleteRoute, journeyRoute, restoreRoute, receiptRoute, generateRoute, cancelRoute, makePayRoute, item }) {
    // confirm before delete //
    const [ModalPaymentOpen, setModalPaymentOpen] = useState(false);
    const [ModalCancelPaymentOpen, setModalCancelPaymentOpen] = useState(false);
    const [isModalReceiptOpen, setIsModalReceiptOpen] = useState(false);

    const confirmDelete = (event) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            event.preventDefault(); // Prevent the default action if the user cancels
        }
    };

    const JourneyconfirmDelete = (event) => {
        if (!window.confirm("Are you sure to complete the journey?")) {
            event.preventDefault(); // Prevent the default action if the user cancels
        }
    };

    const makePaymentDialog = (event) => {
        if (!window.confirm("Are you sure for make payment?")) {
            event.preventDefault(); // Prevent the default action if the user cancels
        }
    };

    item.ride_status = item.metas[2].value;
    item.is_confirmed = item.is_confirmed;
    // console.log(item.ride_status);
    const confirmRestore = (event) => {
        if (!window.confirm("Are you sure you want to restore this item?")) {
            event.preventDefault(); // Prevent the default action if the user cancels
        }
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



    const ModalCancelPaymentOpenDyn = () => {
        setModalCancelPaymentOpen(true);
    };



    const closeModalCancelPaymentDyn = () => {
        setModalCancelPaymentOpen(false);

    };


    const ModalReceiptOpenDyn = () => {
        setIsModalReceiptOpen(true);
    };

    const closeModalReceiptDyn = () => {
        setIsModalReceiptOpen(false);

    };

    return (
        <div className="flex gap-1 justify-end">



            {editRoute && item.ride_status != 'Completed' && (item.status === 1 || item.is_comfirmed == 1 || item.payment == 1) && (
                <Link
                    href={editRoute}
                    className="border-2 hover:border-primary transition-all border-light p-1.5 rounded-lg"
                >
                    <FiEdit color="#012d40" title="Edit Booking" />
                </Link>
            )}


            {deleteRoute && item.deleted_at === null && item.is_confirmed == 1 && item.payment == 0 && (item.ride_status == 'Cancelled' || item.ride_status == 'Completed' || item.ride_status == 'Upcoming') && (
                <Link
                    onClick={confirmDelete}
                    href={deleteRoute}
                    className="border-2 hover:border-danger transition-all border-light p-1.5 rounded-lg"
                >
                    <FiTrash color="#012d40" className="hover:text-danger" title="Delete Booking" />
                </Link>
            )}

            {restoreRoute && item.deleted_at !== null && (
                <Link
                    onClick={confirmRestore}
                    href={restoreRoute}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >
                    <FiRepeat className="hover:text-primary-500" title='restore' />
                </Link>
            )}



            {makePayRoute && item.payment === 0 && item.is_confirmed === 1 && item.status == 1 && (
                <Link
                    href={makePayRoute}
                    onClick={makePaymentDialog}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >
                    <FcApproval color="#012d40" title="Make payment" />
                </Link>
            )}

            {receiptRoute && (item.status === 1 || item.is_comfirmed == 1 || item.payment == 1) && (
                <button

                    onClick={() => ModalReceiptOpenDyn()}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >
                    <FiEye color="#012d40" title="view receipt" />
                </button>

            )}

            {journeyRoute && item.is_confirmed === 1 && item.status === 0 && item.payment === 0 && (
                <Link
                    onClick={JourneyconfirmDelete}
                    href={journeyRoute}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >
                    <FiCheck color="#012d40" title="Complete Journey" />
                </Link>
            )}


            {generateRoute && item.ride_status == 'Upcoming' && item.is_confirmed === 0 && item.status === 0 && item.payment === 0 && (<button

                onClick={() => ModalPaymentOpenDyn()}
                className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
            >

                <FcApproval color="#012d40" title="Generate Receipt" />
            </button>
            )}


            {cancelRoute && item.payment == 0 && (item.status === 1 || item.is_comfirmed == 1 || item.ride_status == 'Upcoming') && (
                <>
                    <button

                        onClick={() => ModalCancelPaymentOpenDyn()}
                        className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                    >

                        <FcCancel color="#012d40" title="cancel booking" />
                    </button>
                </>
            )}

            <Payment
                ModelStatus={ModalPaymentOpen}
                onClose={closeModalPaymentDyn}
                updateModelOpen={setModalPaymentOpen}
                booking={item}
            />
            <Receipt updateModelOpen={isModalReceiptOpen} onClose={closeModalReceiptDyn} receipt={item} />

            <CancelBooking
                ModelStatus1={ModalCancelPaymentOpen}
                onClose1={closeModalCancelPaymentDyn}
                updateModelOpen1={setModalCancelPaymentOpen}
                booking1={item}
            />


        </div>
    );
}



//    if status is pending   then  it will show approve booking request after two minutes passed.

///   When  it's approved  and cancel button then  approved button gone  and show cancel and make payment
// Make payment done then complete button show and cancel button and after complete button click then then show delete and button only
