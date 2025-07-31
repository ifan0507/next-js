import { getReservationByUserId } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import { Calendar, Clock, CreditCard, MapPin, User } from "lucide-react";
import Link from "next/link";

const MyReserveList = async () => {
  const reservation = await getReservationByUserId();
  if (!reservation) return notFound;

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Reservation Cards */}
        <div className="space-y-6">
          {reservation.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
              {/* Header with ID and Status */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
                  {/* Left: ID Section */}
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700 break-words">
                      Reservation ID: <span className="font-mono text-gray-900">#{item.id}</span>
                    </span>
                  </div>

                  {/* Right: Status */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
        ${item.Payment?.status === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {item.Payment?.status || "unknown"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-1/3 relative">
                  <img src={item.Room.image} alt="Room" className="w-full h-64 lg:h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Details Section */}
                <div className="lg:w-2/3 p-6 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Price */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Price</div>
                        <div className="text-sm font-semibold text-gray-900">{formatCurrency(item.price)}</div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Duration</div>
                        <div className="text-sm font-semibold text-gray-900">
                          {differenceInCalendarDays(item.endDate, item.startDate)} Night{differenceInCalendarDays(item.endDate, item.startDate) > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Arrival</div>
                        <div className="text-sm font-semibold text-gray-900">{formatDate(item.startDate.toISOString())}</div>
                      </div>
                    </div>

                    {/* Departure */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-orange-600" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Departure</div>
                        <div className="text-sm font-semibold text-gray-900">{formatDate(item.endDate.toISOString())}</div>
                      </div>
                    </div>
                  </div>

                  {/* Sub Total */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Sub Total</span>
                      <span className="text-lg font-bold text-gray-900">{item.Payment && formatCurrency(item.Payment.amount)}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="absolute bottom-6 right-6">
                    {item.Payment?.status === "unpaid" ? (
                      <Link
                        href={`/checkout/${item.id}`}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        Pay Now
                      </Link>
                    ) : (
                      <Link
                        href={`/myreservation/${item.id}`}
                        className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        View Detail
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReserveList;
