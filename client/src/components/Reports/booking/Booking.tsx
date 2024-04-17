import BookingContent from "./BookingContent";
import BookingForm from "./BookingForm";

const Booking = () => {
  return (
    <>
      <section className="px-10">
        <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
          <BookingForm />
        </div>
        <div className="divider"></div>
        <BookingContent />
      </section>
    </>
  );
};

export default Booking;
