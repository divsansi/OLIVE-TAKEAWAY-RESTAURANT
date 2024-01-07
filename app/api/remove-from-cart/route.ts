import { getCartId } from "@/components/noAuth";
import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const itemId = formData.get("itemId");
    const cartId = await getCartId();

    // find the item in the cart
    const item = await prisma.menuItemsOnCart.findFirst({
        where: {
            menuItemId: String(itemId),
            cartId: String(cartId),
        },
    });

    const cartItemQty = await prisma.cartItemQty.findFirst({
        where: {
            menuItemId: String(itemId),
            cartId: String(cartId),
        },
    });

    // Delete the item from the cart if it is already in the cart
    if (item && cartItemQty) {
        await prisma.menuItemsOnCart.delete({
            where: {
                id: String(item.id),
            },
        });

        await prisma.cartItemQty.delete({
            where: {
                id: String(cartItemQty.id),
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
