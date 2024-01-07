import { getWishlistId } from "@/components/noAuth";
import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const itemId = formData.get("itemId");
    const wishlistId = await getWishlistId();

    // find the item in the cart
    const item = await prisma.menuItemsOnWishlist.findFirst({
        where: {
            menuItemId: String(itemId),
            wishlistId: String(wishlistId),
        },
    });

    // Delete the item from the cart if it is already in the cart
    if (item) {
        await prisma.menuItemsOnWishlist.delete({
            where: {
                id: String(item.id),
            },
        });
    }

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/wishlist",
        },
    });
};
