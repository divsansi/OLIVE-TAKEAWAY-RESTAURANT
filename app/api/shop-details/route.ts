import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const shopId = formData.get("shopId");
    const shopName = formData.get("shopName");
    const shopAddress = formData.get("shopAddress");
    const shopCity = formData.get("shopCity");
    const shopPhone = formData.get("shopPhone");
    const shopEmail = formData.get("shopEmail");

    // check empty fields
    if (
        !shopId ||
        !shopName ||
        !shopAddress ||
        !shopCity ||
        !shopPhone ||
        !shopEmail
    ) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Empty fields",
            },
        });
    }

    // Update shop details
    try {
        const shop = await prisma.restaurant.update({
            where: {
                id: String(shopId),
            },
            data: {
                name: String(shopName),
                address: String(shopAddress),
                city: String(shopCity),
                phone: String(shopPhone),
                email: String(shopEmail),
            },
        });

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/shop",
            },
        });
    } catch (error) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Error updating shop details",
            },
        });
    }
};
