import { Link,router } from "@inertiajs/react";

import { FiEdit, FiTrash, FiSlash,FiRepeat, FiEye, FiCheck, FiCheckSquare} from "react-icons/fi";
import Payment from "./Payment";
import { useState } from "react";

export default function BookingActionButtons({ editRoute, deleteRoute, blockRoute,restoreRoute,item }) {
    // confirm before delete //
    const [ModalPaymentOpen, setModalPaymentOpen] = useState(false);
    const confirmDelete = (event) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            event.preventDefault(); // Prevent the default action if the user cancels
        }
    };

    item.ride_status  = 'approved';
    item.is_confirmed = 1;
    const confirmRestore = (event) => {
        if (!window.confirm("Are you sure you want to restore this item?")) {
            event.preventDefault(); // Prevent the default action if the user cancels
        }
    };
    const onSubmit = (booking_id) => {

        router.get("/dashboard/bookings/updatebooking/"+booking_id);
    };


    const ModalPaymentOpenDyn = () => {
        setModalPaymentOpen(true);
      };

      const closeModalPaymentDyn = () => {
        setModalPaymentOpen(false);

      };
    // console.log(item.is_confirmed);
    return (
        <div className="flex gap-1 justify-end">



            {editRoute && item.ride_status != 'completed' && item.ride_status != 'cancelled'  && (
                <Link
                    href={editRoute}
                    className="border-2 hover:border-primary transition-all border-light p-1.5 rounded-lg"
                >
                    <FiEdit color="#012d40" />
                </Link>
            )}


            {deleteRoute && item.deleted_at === null &&  (item.ride_status == 'approved' || item.ride_status == 'cancelled' || item.ride_status == 'completed' )  &&  (
                <Link
                    onClick={confirmDelete}
                    href={deleteRoute}
                    className="border-2 hover:border-danger transition-all border-light p-1.5 rounded-lg"
                >
                    <FiTrash color="#012d40" className="hover:text-danger" />
                </Link>
            )}
            {restoreRoute &&  item.deleted_at !== null && (
                <Link
                onClick={confirmRestore}
                    href={restoreRoute}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >
                    <FiRepeat className="hover:text-primary-500"    title= 'restore' />
                </Link>
            )}

            {blockRoute && item.payment === 0  && item.ride_status == 'approved' && (
                <button


                    onClick={()=>ModalPaymentOpenDyn()}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >

                    <FiSlash color="#012d40" title="Make Payment" />
                </button>
            )}


            {blockRoute && item.payment === 1 && item.is_confirmed === 1 && item.ride_status == 'completed'  && (
                <Link
                    href={blockRoute}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >
                     <FiEye color="#012d40" title="view receipt" />
                </Link>
            )}




            {blockRoute && item.ride_status == 'completed' && item.status == 0  && (
                <Link
                    href={blockRoute}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >
                   <FiCheckSquare color="#012d40" title="completed" />
                </Link>
            )}

            {/* {blockRoute && item.payment === 0 && item.ride_status == 'approved' && (
                <Link
                    href={blockRoute}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >
                   <FiCheckSquare color="#012d40" title="collect payment" />
                </Link>
            )} */}


            {blockRoute && item.ride_status == 'pending' && (
            <Link
                                href='#'
                                className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                            >
                                <FiCheck color="#012d40" title="mark as confirmed" onClick={() => onSubmit(item.id)} />
                            </Link>
            )}
            {blockRoute  && item.ride_status != 'completed' && item.ride_status != 'cancelled' &&  (
                <><Link
                    href={blockRoute}
                    className="border-2 hover:border-warning transition-all border-light p-1.5 rounded-lg"
                >
                        <FiSlash color="#012d40" title="cancel booking"  />
                    </Link></>
            )}

<Payment
                 isOpen={ModalPaymentOpen}  onClose={closeModalPaymentDyn}
                />
        </div>
    );
}



//    if status is pending   then  it will show approve booking request after two minutes passed.

///   When  it's approved  and cancel button then  approved button gone  and show cancel and make payment
// Make payment done then complete button show and cancel button and after complete button click then then show delete and button only
