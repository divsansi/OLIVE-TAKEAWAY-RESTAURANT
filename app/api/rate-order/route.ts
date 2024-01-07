import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const orderId = formData.get("orderId");
    const restaurantId = formData.get("restaurantId");
    const userId = formData.get("userId");
    const rating = formData.get("rating");

    // Create new Rating
    const orderRating = await prisma.orderRating.create({
        data: {
            orderId: String(orderId),
            restaurantId: String(restaurantId),
            userId: String(userId),
            rating: Number(rating),
        },
    });

    // Update order status
    const order = await prisma.order.update({
        where: {
            id: String(orderId),
        },
        data: {
            rated: true,
        },
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/track-order",
        },
    });
};
