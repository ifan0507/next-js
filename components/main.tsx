import Card from "@/components/card";
import { getRooms } from "@/lib/data";
import { notFound } from "next/navigation";

const Main = async () => {
  const rooms = await getRooms();
  if (!rooms) return notFound();
  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
      <div className="grid gap-7 md:grid-cols-3">
        {rooms?.map((room) => (
          <Card room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
};

export default Main;
