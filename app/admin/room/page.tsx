import Link from "next/link";
import RoomTable from "@/components/admin/room/room-table";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Rooms",
  description: "List Room",
};

const RoomPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/admin//room/create" className="bg-orange-400 px-6 py-2.5 hover:bg-orange-500 text-white font-bold">
          Create New
        </Link>
      </div>
      <Suspense fallback={<p>Loading data...</p>}>
        <RoomTable />
      </Suspense>
    </div>
  );
};

export default RoomPage;
