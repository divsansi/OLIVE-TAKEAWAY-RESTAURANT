import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const menuId = formData.get("menuId");

    // Delete all the items in the menu
    await prisma.menuItem.deleteMany({
        where: {
            menuId: String(menuId),
        },
    });

    // Delete the menu
    await prisma.menu.delete({
        where: {
            id: String(menuId),
        },
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/shop",
        },
    });
};
