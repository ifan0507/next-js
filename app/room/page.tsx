import HeaderSection from "@/components/header-section";
import Main from "@/components/main";
import RoomSkeleton from "@/components/skeletons/room-skeleton";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Rooms & Rates",
  description: "Choose your best room today",
};

const RoomPage = () => {
  return (
    <div>
      <HeaderSection title="Rooms & Rates" subTitle="Lorem ipsum dolor sit awet." />
      <div className="mt-10 px-4">
        <Suspense fallback={<RoomSkeleton />}>
          <Main />
        </Suspense>
      </div>
    </div>
  );
};

export default RoomPage;
