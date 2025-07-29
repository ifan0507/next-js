import { getRooms } from "@/lib/data";
import Image from "next/image";
import React from "react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DeleteButton, EditButton } from "@/components/admin/room/button";
const RoomTable = async () => {
  const rooms = await getRooms();
  return (
    <div className="bg-white p-4 mt-5 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Image</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">Room Name</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">Price</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">Created At</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rooms?.length ? (
              rooms.map((room) => (
                <tr className="hover: bg-gray-100" key={room.id}>
                  <td className="px-6 py-4">
                    <div className="h-20 w-32 relative">
                      <Image src={room.image} fill sizes="20vw" alt="room image" className="object-cover"></Image>
                    </div>
                  </td>
                  <td className="px-6 py-4">{room.name}</td>
                  <td className="px-6 py-4">{formatCurrency(room.price)}</td>
                  <td className="px-6 py-4">{formatDate(room.createdAt.toString())}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-center gap-1">
                      <EditButton id={room.id} />
                      <DeleteButton id={room.id} imageUrl={room.image} />
                    </div>
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

export default RoomTable;
