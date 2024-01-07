import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const userId = formData.get("userId");
    const shopName = formData.get("shopName");
    const shopAddress = formData.get("shopAddress");
    const shopCity = formData.get("shopCity");
    const shopPhone = formData.get("shopPhone");
    const shopEmail = formData.get("shopEmail");
    const requestId = formData.get("requestId");

    // create shop
    const shop = await prisma.restaurant.create({
        data: {
            name: String(shopName),
            address: String(shopAddress),
            city: String(shopCity),
            phone: String(shopPhone),
            email: String(shopEmail),
            userId: String(userId),
        },
    });

    // update shop request
    const shopRequest = await prisma.shopRequest.update({
        where: {
            id: String(requestId),
        },
        data: {
            status: "Accepted",
        },
    });

    // update user status
    const user = await prisma.user.update({
        where: {
            id: String(userId),
        },
        data: {
            shopStatus: "Open",
        },
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/admin",
        },
    });
};
