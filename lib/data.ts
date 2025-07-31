import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const getAmenities = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized Access");
  }

  try {
    const result = await prisma.amenities.findMany();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRooms = async () => {
  try {
    const result = await prisma.room.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: { RoomAmenities: { select: { amenitiesId: true } } },
    });
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomDetailById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        RoomAmenities: {
          include: {
            Amenities: {
              select: { name: true },
            },
          },
        },
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservationById = async (id: string) => {
  try {
    const result = await prisma.reservation.findUnique({
      where: { id },
      include: {
        Room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        User: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        Payment: true,
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getDisableRoomById = async (roomId: string) => {
  try {
    const result = await prisma.reservation.findMany({
      select: {
        startDate: true,
        endDate: true,
      },
      where: {
        roomId: roomId,
        Payment: {
          status: { not: "failure" },
        },
      },
    });
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservationByUserId = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) throw new Error("Unauthorizes Access");
  try {
    const result = await prisma.reservation.findMany({
      where: { userId: session.user.id },
      include: {
        Room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        User: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        Payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRevenueReserve = async () => {
  try {
    const result = await prisma.reservation.aggregate({
      _count: true,
      _sum: {
        price: true,
      },
      where: {
        Payment: {
          status: { not: "failure" },
        },
      },
    });
    console.log(result);
    return {
      revenue: result._sum.price || 0,
      reserve: result._count,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getTotalCustomer = async () => {
  try {
    const result = await prisma.reservation.findMany({
      distinct: ["userId"],
      where: {
        Payment: {
          status: { not: "failure" },
        },
      },
      select: { userId: true },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservations = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id || session.user.role !== "admin") throw new Error("Unauthorizes Access");
  try {
    const result = await prisma.reservation.findMany({
      include: {
        Room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        User: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        Payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};
