import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const userId = formData.get("userId") as string | null; // Ensure cartId is of type string or null
    const orderId = formData.get("orderId") as string | null; // Ensure cartId is of type string or null

    // find hold items
    const holdItems = await prisma.orderMenuItemFromUserHold.findMany({
        where: {
            userId: userId && String(userId),
        },
    });

    // find menu items
    const menuItems = [];
    for (let i = 0; i < holdItems.length; i++) {
        const item = holdItems[i];

        // find menu item
        const menuItem = await prisma.menuItem.findFirst({
            where: {
                id: String(item.menuItemId),
            },
        });

        if (holdItems[i]?.id == orderId) menuItems.push(menuItem);
    }

    // find total
    let total = 0;
    for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];

        total += (item?.price ?? 0) * holdItems[i].qty;
    }

    return new Response(JSON.stringify({ total: total }), {
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    });
};
