import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { reservationProps } from "@/types/reservation";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export const POST = async (request: Request) => {
  const reservation: reservationProps = await request.json();

  const parameter = {
    transaction_details: {
      order_id: reservation.id,
      gross_amount: reservation.Payment?.amount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: reservation.User.name,
      email: reservation.User.email,
      phone: reservation.User.phone,
    },
  };

  const token = await snap.createTransactionToken(parameter);
  return NextResponse.json({ token });
};
