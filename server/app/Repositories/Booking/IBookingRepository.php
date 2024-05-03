<?php

namespace App\Repositories\Booking;


interface IBookingRepository
{
   public function  create(array $data);
   public function getBookings();
   public function deleteBooking(string $id);
   public function getBookinWithDetectionPrice();
   public function bookingSearch(string $searchQuery);
}
