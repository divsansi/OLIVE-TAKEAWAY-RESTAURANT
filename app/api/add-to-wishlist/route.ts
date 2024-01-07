import { getWishlistId } from "@/components/noAuth";
import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const itemId = formData.get("itemId");
    const wishlistId = await getWishlistId();

    // Check if the item is already in the wishlist
    const item = await prisma.menuItemsOnWishlist.findFirst({
        where: {
            menuItemId: String(itemId),
            wishlistId: String(wishlistId),
        },
    });

    let inlist;

    if (item) {
        inlist = true;
    } else {
        inlist = false;
    }

    // Delete the item from the wishlist if it is already in the wishlist
    if (inlist) {
        if (item) {
            await prisma.menuItemsOnWishlist.delete({
                where: {
                    id: String(item.id),
                },
            });
        }
    } else {
        // Add the itemId to wishlist
        await prisma.menuItemsOnWishlist.create({
            data: {
                menuItemId: String(itemId),
                wishlistId: String(wishlistId),
                assignedBy: "user",
            },
        });
    }

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
};
