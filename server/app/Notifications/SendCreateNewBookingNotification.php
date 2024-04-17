<?php

namespace App\Notifications;

use App\Models\Patient;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendCreateNewBookingNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */

     public $patient;
     public $bookingDay;
     public $bookingId;
     public $bookingCreatedAt;
    public function __construct(object $booking)
    {
        $this->patient = Patient::find($booking->patient_id);
        $this->bookingDay = $booking->booking_date;
        $this->bookingId = $booking->id;
        $this->bookingCreatedAt = $booking->created_at;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }


    public function toDatabase(object $notifiable): array
    {
        return [
            "booking_id" => $this->bookingId,
            "booking_date" => $this->bookingDay,
            "booking_created_at" => $this->bookingCreatedAt->longAbsoluteDiffForHumans(),
            "owner_name" => $this->patient->owner_name,
            "animal_name"=> $this->patient->animal_name,
            "animal_type"=> $this->patient->animal_type,
        ];
    }
}
