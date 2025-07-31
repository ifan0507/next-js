import MyReserveList from "@/components/my-reserve-list";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Reservation",
};

const MyReservationPage = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/signin");
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-lg mx-auto mt-10 py-20 px-4">
        <div className="flex items-center justify-between">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Hi, {session.user.name}</h1>
            <p className="text-gray-600">Here&rsquo;s your book history</p>
          </div>
        </div>
        <div className="rounded-sm">
          <MyReserveList />
        </div>
      </div>
    </div>
  );
};

export default MyReservationPage;
