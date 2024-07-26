<?php

namespace App\Mail;

use App\Model\BookingIncome;
use App\Model\Hyvikk;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CustomerInvoice extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $booking;
    public $invoice_id;
    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
        $this->invoice_id = BookingIncome::where('booking_id',$booking->id)->latest()->first();
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
         $email = Hyvikk::get("email");
        return new Envelope(
            from: new Address($email, explode('@',$email)[0]),
            replyTo: [
                new Address('taylor@example.com', 'Taylor Otwell'),
            ],
            subject: 'Generate Invoice. Invoice ID: '.$this->invoice_id->income_id,
        );

    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.customer_invoice',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }


}
