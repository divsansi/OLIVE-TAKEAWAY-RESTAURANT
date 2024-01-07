import { NextRequest } from "next/server";
import prisma from "@/utils/database";
import { getCartItems } from "@/components/checkDatabase";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const userId = formData.get("userId") as string | null; // Ensure cartId is of type string or null
    const cartId = formData.get("cartId") as string | null; // Ensure cartId is of type string or null
    const paymentMethod = formData.get("paymentMethod") as string | null; // Ensure paymentMethod is of type string or null

    const cartItems = await getCartItems(userId?.toString());

    let orderItem;

    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];

        // Find Menu of the item
        const menu = await prisma.menu.findFirst({
            where: {
                id: String(item.menuId),
            },
        });

        // Get Restaurant id of the menu
        const restaurantId = menu?.restaurantId;

        // Create order
        const order = await prisma.order.create({
            data: {
                status: "Pending",
            },
        });
        if (paymentMethod == "paypal") {
            // Create order item
            orderItem = await prisma.orderMenuItemFromUserHold.create({
                data: {
                    orderId: order.id,
                    userId: userId,
                    restaurantId: restaurantId,
                    menuItemId: item.id,
                    qty: item.qty,
                },
            });
        } else {
            orderItem = await prisma.orderMenuItemFromUser.create({
                data: {
                    orderId: order.id,
                    userId: userId,
                    restaurantId: restaurantId,
                    menuItemId: item.id,
                    qty: item.qty,
                },
            });
        }

        // Delete the item from the cart
        const entryId = await prisma.menuItemsOnCart.findFirst({
            where: {
                menuItemId: String(item.id),
                cartId: String(cartId),
            },
        });

        await prisma.menuItemsOnCart.delete({
            where: {
                id: String(entryId?.id),
            },
        });

        // Delete the item qty from the cart
        const qtyId = await prisma.cartItemQty.findFirst({
            where: {
                menuItemId: String(item.id),
                cartId: String(cartId),
            },
        });

        await prisma.cartItemQty.delete({
            where: {
                id: String(qtyId?.id),
            },
        });
    }

    if (paymentMethod == "paypal") {
        return new Response(null, {
            status: 302,
            headers: {
                Location:
                    "/payment?orderId=" + orderItem?.id + "&userId=" + userId,
            },
        });
    } else {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/track-order",
            },
        });
    }
};
