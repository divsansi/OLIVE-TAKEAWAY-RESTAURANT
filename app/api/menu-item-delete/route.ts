import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const itemId = formData.get("itemId");

    // Delete the menu item
    await prisma.menuItem.delete({
        where: {
            id: String(itemId),
        },
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/shop",
        },
    });
};
