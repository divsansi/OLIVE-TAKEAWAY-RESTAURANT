import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const userId = formData.get("userId");
    const requestId = formData.get("requestId");

    // update shop request
    const shopRequest = await prisma.shopRequest.update({
        where: {
            id: String(requestId),
        },
        data: {
            status: "Suspended",
        },
    });

    // update user status
    const user = await prisma.user.update({
        where: {
            id: String(userId),
        },
        data: {
            shopStatus: "Suspended",
        },
    });

    // Delete Restaurant
    const restaurant = await prisma.restaurant.findMany({
        where: {
            userId: String(userId),
        },
    });

    for (let i = 0; i < restaurant.length; i++) {
        const restaurantId: string = restaurant[i]?.id;
        await prisma.restaurant.delete({
            where: {
                id: String(restaurantId),
            },
        });
    }

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/admin",
        },
    });
};
