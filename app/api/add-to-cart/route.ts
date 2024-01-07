import { getCartId } from "@/components/noAuth";
import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const itemId = formData.get("itemId");
    const cartId = await getCartId();

    // Add the itemId to cart
    await prisma.menuItemsOnCart.create({
        data: {
            menuItemId: String(itemId),
            cartId: String(cartId),
            assignedBy: "user",
        },
    });

    // Add Cart item total
    await prisma.cartItemQty.create({
        data: {
            cartId: String(cartId),
            menuItemId: String(itemId),
            qty: 1,
        },
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
};
