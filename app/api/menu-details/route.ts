import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const shopId = formData.get("shopId");
    const menuName = formData.get("menuName");
    const menuDescription = formData.get("menuDescription");
    const menuType = formData.get("menuType");

    // check empty fields
    if (!shopId || !menuName || !menuDescription || !menuType) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Empty fields",
            },
        });
    }

    // Create menu
    try {
        const menu = await prisma.menu.create({
            data: {
                name: String(menuName),
                description: String(menuDescription),
                type: String(menuType),
                restaurantId: String(shopId),
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
                Location: "/something-wrong?error=Error creating menu",
            },
        });
    }
};
