import { getReservationById } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatDate, formatCurrency } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";

const ReservationDetail = async ({ reservationId }: { reservationId: string }) => {
  const reservation = await getReservationById(reservationId);
  if (!reservation) return notFound();

  return (
    <div className="w-full bg-white border border-gray-200 rounded-sm shadow p-6">
      {/* Detail Reservasi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kolom Kiri */}
        <ul className="space-y-4">
          <li className="flex justify-between">
            <p className="text-sm font-medium text-gray-600">Reservation ID</p>
            <span className="text-base font-semibold text-gray-900">{reservation.id}</span>
          </li>
          <li className="flex justify-between">
            <p className="text-sm font-medium text-gray-600">Book Date</p>
            <span className="text-base font-semibold text-gray-900">{formatDate(reservation.createdAt.toISOString())}</span>
          </li>
          <li className="flex justify-between">
            <p className="text-sm font-medium text-gray-600">Name</p>
            <span className="text-base font-semibold text-gray-900">{reservation.User.name}</span>
          </li>
          <li className="flex justify-between">
            <p className="text-sm font-medium text-gray-600">Email</p>
            <span className="text-base font-semibold text-gray-900">{reservation.User.email}</span>
          </li>
        </ul>

        {/* Kolom Kanan */}
        <ul className="space-y-4">
          <li className="flex justify-between">
            <p className="text-sm font-medium text-gray-600">Phone Number</p>
            <span className="text-base font-semibold text-gray-900">{reservation.User.phone}</span>
          </li>
          <li className="flex justify-between">
            <p className="text-sm font-medium text-gray-600">Payment Method</p>
            <span className="text-base font-semibold text-gray-900 capitalize">{reservation.Payment?.methode?.replace("_", " ") || "-"}</span>
          </li>
          <li className="flex justify-between">
            <p className="text-sm font-medium text-gray-600">Payment Status</p>
            <span className="text-base font-semibold text-gray-900">{reservation.Payment?.status || "-"}</span>
          </li>
        </ul>
      </div>

      {/* Tabel Reservasi */}
      <div className="relative overflow-x-auto mt-8">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Room Name</th>
              <th className="px-6 py-3">Arrival</th>
              <th className="px-6 py-3">Departure</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3 text-right">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-t">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{reservation.Room.name}</span>
                  <span className="text-sm text-gray-500">Price: {formatCurrency(reservation.price)}</span>
                </div>
              </td>
              <td className="px-6 py-4">{formatDate(reservation.startDate.toISOString())}</td>
              <td className="px-6 py-4">{formatDate(reservation.endDate.toISOString())}</td>
              <td className="px-6 py-4">{differenceInCalendarDays(reservation.endDate, reservation.startDate)} Night</td>
              <td className="px-6 py-4 text-right">{reservation.Payment && formatCurrency(reservation.Payment.amount)}</td>
            </tr>
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="px-6 py-3 font-bold" colSpan={2}>
                Total
              </td>
              <td className="px-6 py-3 font-bold text-right" colSpan={3}>
                {reservation.Payment && formatCurrency(reservation.Payment.amount)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReservationDetail;
