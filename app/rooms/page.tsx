import Card from "@/components/card";
import { getRooms } from "@/lib/data";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Who We Are",
};

const RoomPage = async () => {
  const rooms = await getRooms();
  return (
    <div className="max-w-screen-xl px-4 mt-10 py-16 mx-auto">
      <div className="grid gap-7 md:grid-cols-3">
        {rooms?.map((room) => (
          <Card key={room.id} roomName={room.name} roomPrice={room.price} capacity={room.capacity} image={room.image} />
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
