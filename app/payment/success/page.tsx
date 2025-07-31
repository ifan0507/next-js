import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { HiCheckCircle } from "react-icons/hi";

export const metadata: Metadata = {
  title: "Payment Successful",
};

const PaymentSuccess = async ({ searchParams }: { searchParams: Promise<{ transaction_status: string }> }) => {
  const paymentStatus = (await searchParams).transaction_status;
  if (paymentStatus === "pending") redirect("/payment/pending");
  if (paymentStatus === "failure") redirect("/payment/failure");
  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <div className="p-6 md:mx-auto">
        <HiCheckCircle className="text-green-600 w-20 h-20 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
          <p className="text-gray-600 my-2">Thanks you for completing your secure online payment.</p>
          <p>Have a great day! </p>
          <div className="py-10 text-center">
            <Link href="/myreservation" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
              GO TO MY RESERVATION
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
