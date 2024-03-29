<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendPatientCreatedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */

    private $booking;
    private $doctor;
    public function __construct($doctorId, $createdBooking)
    {
        $this->booking = $createdBooking;
        $this->doctor = $doctorId;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }


    public function toDatabase($notifiable)
    {


        return [
            'doctor_id' => $this->doctor,
            'patient_id' => $this->booking->patient_id,
            'created_at' => $this->booking->created_at
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
