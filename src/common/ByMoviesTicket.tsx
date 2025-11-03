import React, { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import type { MediaItem } from "../type/type";

interface ByMoviesTicketProps {
  movie: MediaItem;
  onClose: () => void;
}

const ByMoviesTicket: React.FC<ByMoviesTicketProps> = ({ movie, onClose }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const seatRows = [
    { row: "A", seats: 8 },
    { row: "B", seats: 8 },
    { row: "C", seats: 8 },
    { row: "D", seats: 8 },
    { row: "E", seats: 8 },
  ];

  const pricePerSeat = 180;
  const total = selectedSeats.length * pricePerSeat;

  const toggleSeat = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        onClose();
      }, 2500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-[#121212] rounded-2xl p-6 w-[95%] md:w-[600px] relative shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden border border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={22} />
        </button>

        {!paymentSuccess ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-1 text-center">
              🎟️ {movie.title}
            </h2>
            <p className="text-gray-400 text-sm mb-6 text-center">
              Select your seats and confirm booking
            </p>

            <div className="relative mb-6">
              <div className="w-full h-[4px] bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 rounded-full" />
              <p className="text-center text-gray-400 text-xs mt-2">
                SCREEN THIS WAY
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {seatRows.map(({ row, seats }) => (
                <div
                  key={row}
                  className="flex justify-center items-center gap-2"
                >
                  <span className="text-gray-400 w-5 text-right">{row}</span>
                  {[...Array(seats)].map((_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const selected = selectedSeats.includes(seatId);
                    return (
                      <button
                        key={seatId}
                        onClick={() => toggleSeat(seatId)}
                        disabled={isPaying}
                        className={`w-9 h-9 text-sm rounded-md font-semibold transition-all duration-200 ${
                          selected
                            ? "bg-green-500 text-white scale-105"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="bg-[#1c1c1c] p-4 rounded-xl border border-gray-800 mb-4">
              <div className="flex justify-between text-gray-300 mb-1">
                <span>Selected Seats:</span>
                <span className="text-green-400 font-medium">
                  {selectedSeats.length ? selectedSeats.join(", ") : "None"}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Total Amount:</span>
                <span className="text-yellow-400 font-semibold">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={!selectedSeats.length || isPaying}
              className={`w-full py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                selectedSeats.length
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-400 hover:to-orange-400"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              } ${isPaying ? "opacity-70 cursor-wait" : ""}`}
            >
              {isPaying ? "Processing Payment..." : "Proceed to Pay"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 animate-fadeIn">
            <CheckCircle2
              size={80}
              className="text-green-400 mb-4 animate-bounce"
            />
            <h3 className="text-2xl font-bold text-white mb-2">
              Payment Successful 🎉
            </h3>
            <p className="text-gray-400 mb-3 text-center">
              Your tickets for
              <span className="text-yellow-400">{movie.title}</span> have been
              booked!
            </p>
            <p className="text-gray-500 text-sm text-center">
              Enjoy your movie 🍿 Closing automatically...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ByMoviesTicket;
