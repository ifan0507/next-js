import { getReservations, getRooms } from "@/lib/data";
import Image from "next/image";
import React from "react";
import { formatDate, formatCurrency } from "@/lib/utils";
const ReservationList = async () => {
  const reservation = await getReservations();
  if (!reservation) return <p>No Reservation Found</p>;
  return (
    <div className="bg-white p-4 mt-5 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Image</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">Customer Name</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">Arrival</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">Depature</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">Room Name</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">Price</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">Created At</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">Status Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservation?.length ? (
              reservation.map((reserve) => (
                <tr className="hover: bg-gray-100" key={reserve.id}>
                  <td className="px-6 py-4">
                    <div className="h-20 w-32 relative">
                      <Image src={reserve.Room.image} fill sizes="20vw" alt="room image" className="object-cover"></Image>
                    </div>
                  </td>
                  <td className="px-6 py-4">{reserve.User.name}</td>
                  <td className="px-6 py-4">{formatDate(reserve.startDate.toString())}</td>
                  <td className="px-6 py-4">{formatDate(reserve.endDate.toString())}</td>
                  <td className="px-6 py-4">{reserve.Room.name}</td>
                  <td className="px-6 py-4">{formatCurrency(reserve.Room.price)}</td>
                  <td className="px-6 py-4">{formatDate(reserve.createdAt.toString())}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="capitalize">{reserve.Payment?.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center px-6 py-4">
                  No Room Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationList;
