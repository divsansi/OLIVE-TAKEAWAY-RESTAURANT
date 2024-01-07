import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const itemId = formData.get("itemId");
    const cartId = formData.get("cartId");
    const qty = formData.get("qty");

    // find the item in the cart
    const item = await prisma.cartItemQty.findFirst({
        where: {
            menuItemId: String(itemId),
            cartId: String(cartId),
        },
    });

    // update the item qty
    if (item) {
        await prisma.cartItemQty.update({
            where: {
                id: String(item.id),
            },
            data: {
                qty: Number(qty),
            },
        });
    }

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/cart",
        },
    });
};
