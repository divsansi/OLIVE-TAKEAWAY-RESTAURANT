import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import prisma from "@/utils/database";

export async function checkWishlist() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    const wishlist = await prisma.wishlist.findMany({
        where: {
            userId: userId,
        },
    });

    // Create if not exists
    if (wishlist.length === 0) {
        const wishlist = await prisma.wishlist.create({
            data: {
                userId: userId,
            },
        });
    }

    return wishlist;
}

export async function checkCart() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    const cart = await prisma.cart.findMany({
        where: {
            userId: userId,
        },
    });

    // Create if not exists
    if (cart.length === 0) {
        const cart = await prisma.cart.create({
            data: {
                userId: userId,
            },
        });
    }

    return cart;
}

export async function checkRestaurant() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    const restaurant = await prisma.restaurant.findMany({
        where: {
            userId: userId,
        },
    });

    return restaurant;
}

export async function getMenus() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    const restaurant = await prisma.restaurant.findMany({
        where: {
            userId: userId,
        },
    });

    let menus = await prisma.menu.findMany({
        where: {
            restaurantId: restaurant[0].id,
        },
    });

    return menus;
}

// Italian Items
export async function getItalianItems(limit?: number) {
    let menus;
    if (limit) {
        menus = await prisma.menu.findMany({
            take: limit,
            where: {
                type: "Italian",
            },
        });
    } else {
        menus = await prisma.menu.findMany({
            where: {
                type: "Italian",
            },
        });
    }

    let items = [];

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        const menuItems = await prisma.menuItem.findMany({
            where: {
                menuId: menu.id,
            },
        });

        for (let j = 0; j < menuItems.length; j++) {
            const menuItem = menuItems[j];
            items.push(menuItem);
        }
    }

    if (limit) {
        return items.slice(0, limit);
    }

    return items;
}

// Chinese Items
export async function getChineseItems(limit?: number) {
    let menus;
    if (limit) {
        menus = await prisma.menu.findMany({
            take: limit,
            where: {
                type: "Chinese",
            },
        });
    } else {
        menus = await prisma.menu.findMany({
            where: {
                type: "Chinese",
            },
        });
    }

    let items = [];

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        const menuItems = await prisma.menuItem.findMany({
            where: {
                menuId: menu.id,
            },
        });

        for (let j = 0; j < menuItems.length; j++) {
            const menuItem = menuItems[j];
            items.push(menuItem);
        }
    }

    if (limit) {
        return items.slice(0, limit);
    }

    return items;
}

// Sri-Lankan Items
export async function getSriLankanItems(limit?: number) {
    let menus;
    if (limit) {
        menus = await prisma.menu.findMany({
            take: limit,
            where: {
                type: "Sri-Lankan",
            },
        });
    } else {
        menus = await prisma.menu.findMany({
            where: {
                type: "Sri-Lankan",
            },
        });
    }

    let items = [];

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        const menuItems = await prisma.menuItem.findMany({
            where: {
                menuId: menu.id,
            },
        });

        for (let j = 0; j < menuItems.length; j++) {
            const menuItem = menuItems[j];
            items.push(menuItem);
        }
    }

    if (limit) {
        return items.slice(0, limit);
    }

    return items;
}

// Get cart items
export async function getCartItems(uid?: string) {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    let cart;
    if (uid) {
        cart = await prisma.cart.findMany({
            where: {
                userId: uid,
            },
        });
    } else {
        cart = await prisma.cart.findMany({
            where: {
                userId: userId,
            },
        });
    }

    const cartItems = await prisma.menuItemsOnCart.findMany({
        where: {
            cartId: cart[0].id,
        },
    });

    const qty = await prisma.cartItemQty.findMany({
        where: {
            cartId: cart[0].id,
        },
    });

    let items = [];

    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const menuItem = await prisma.menuItem.findFirst({
            where: {
                id: cartItem.menuItemId,
            },
        });

        for (let j = 0; j < qty.length; j++) {
            const cartItemQty = qty[j];
            if (cartItemQty.menuItemId === cartItem.menuItemId) {
                items.push({
                    ...menuItem,
                    qty: cartItemQty.qty,
                });
            }
        }
    }

    return items;
}

// Get wishlist items
export async function getWishlistItems() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    const wishlist = await prisma.wishlist.findMany({
        where: {
            userId: userId,
        },
    });

    const wishlistItems = await prisma.menuItemsOnWishlist.findMany({
        where: {
            wishlistId: wishlist[0].id,
        },
    });

    let items = [];

    for (let i = 0; i < wishlistItems.length; i++) {
        const wishlistItem = wishlistItems[i];
        const menuItem = await prisma.menuItem.findFirst({
            where: {
                id: wishlistItem.menuItemId,
            },
        });

        items.push(menuItem);
    }

    return items;
}

export async function getOrderDetails() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    const orders = await prisma.orderMenuItemFromUser.findMany({
        where: {
            userId: userId,
        },
        take: 50,
    });

    const orderIds = orders.map((order) => order.orderId);
    const menuItemIds = orders.map((order) => order.menuItemId);
    const restaurantIds = orders.map((order) => order.restaurantId);

    const orderExport = [];

    for (let i = 0; i < orderIds.length; i++) {
        const orderId = orderIds[i];
        const menuItemId = menuItemIds[i];
        const restaurantId = restaurantIds[i];

        const order = await prisma.order.findFirst({
            where: {
                id: orderId || "",
            },
        });

        const menuItem = await prisma.menuItem.findFirst({
            where: {
                id: menuItemId || "",
            },
        });

        const restaurant = await prisma.restaurant.findFirst({
            where: {
                id: restaurantId || "",
            },
        });

        const orderMenuItemFromUser =
            await prisma.orderMenuItemFromUser.findFirst({
                where: {
                    orderId: orderId || "",
                    userId: userId,
                },
            });

        let orderRating;
        if (order?.rated) {
            orderRating = await prisma.orderRating.findFirst({
                where: {
                    orderId: orderId || "",
                    userId: userId,
                    restaurantId: restaurantId || "",
                },
            });

            orderExport.push({
                ...order,
                menuItem: menuItem,
                restaurant: restaurant,
                orderMenuItemFromUser: orderMenuItemFromUser,
                orderRating,
            });

            continue;
        }

        orderExport.push({
            ...order,
            menuItem: menuItem,
            restaurant: restaurant,
            orderMenuItemFromUser: orderMenuItemFromUser,
        });
    }

    return { orderExport };
}

export async function getShopOrderDetails() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    const restaurantId = await prisma.restaurant.findFirst({
        where: {
            userId: userId,
        },
    });

    const orders = await prisma.orderMenuItemFromUser.findMany({
        where: {
            restaurantId: restaurantId?.id,
        },
        take: 50,
    });

    const orderIds = orders.map((order) => order.orderId);
    const menuItemIds = orders.map((order) => order.menuItemId);
    const userIds = orders.map((order) => order.userId);

    const orderExport = [];

    for (let i = 0; i < orderIds.length; i++) {
        const orderId = orderIds[i];
        const menuItemId = menuItemIds[i];
        const userId = userIds[i];

        const order = await prisma.order.findFirst({
            where: {
                id: orderId || "",
            },
        });

        const menuItem = await prisma.menuItem.findFirst({
            where: {
                id: menuItemId || "",
            },
        });

        const user = await prisma.user.findFirst({
            where: {
                id: userId || "",
            },
        });

        const orderMenuItemFromUser =
            await prisma.orderMenuItemFromUser.findFirst({
                where: {
                    orderId: orderId || "",
                    userId: userId,
                },
            });

        let orderRating;
        if (order?.rated) {
            orderRating = await prisma.orderRating.findFirst({
                where: {
                    orderId: orderId || "",
                    userId: userId,
                },
            });

            orderExport.push({
                ...order,
                menuItem: menuItem,
                orderMenuItemFromUser: orderMenuItemFromUser,
                orderRating,
            });

            continue;
        }

        orderExport.push({
            ...order,
            menuItem: menuItem,
            orderMenuItemFromUser: orderMenuItemFromUser,
        });
    }

    return { orderExport };
}

export async function getOngoingOrders() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    const orderMenuItemFromUser = await prisma.orderMenuItemFromUser.findMany({
        where: {
            userId: userId,
        },
    });

    const orderIds = orderMenuItemFromUser.map((order) => order.orderId);

    const orders = [];

    // Status not Delivered or Cancelled
    for (let i = 0; i < orderIds.length; i++) {
        const orderId = orderIds[i];
        if (!orderId) continue;
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
            },
        });

        if (
            order &&
            order.status !== "Delivered" &&
            order.status !== "Cancelled"
        )
            orders.push(order);
    }

    return orders;
}

export async function getBestSeller() {
    // get last 100 orders
    const orders = await prisma.orderMenuItemFromUser.findMany({
        take: 100,
    });

    const menuItemIds = orders.map((order) => order.menuItemId);

    if (menuItemIds.length === 0) {
        const firstItem = await prisma.menuItem.findFirst({});

        return firstItem;
    }

    // get the most occuring ID
    let mostOccuring = "";

    for (let i = 0; i < menuItemIds.length; i++) {
        const menuItemId = menuItemIds[i];
        let count = 0;

        for (let j = 0; j < menuItemIds.length; j++) {
            const menuItemId2 = menuItemIds[j];
            if (menuItemId === menuItemId2) {
                count++;
            }
        }

        if (count > 0) {
            // if mostOccuring is empty
            if (mostOccuring === "") {
                mostOccuring = menuItemId || "";
            }

            // if count is more than the mostOccuring
            if (count > Number(mostOccuring)) {
                mostOccuring = menuItemId || "";
            }
        }
    }

    // get the menu item with the most occuring ID
    const menuItem = await prisma.menuItem.findFirst({
        where: {
            id: mostOccuring,
        },
    });

    return menuItem;
}

export async function getShopStatus() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });

    return user?.shopStatus;
}

export async function getUserDetails() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });

    return user;
}

export async function getShopRequestPending() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;
    const request = await prisma.shopRequest.findMany({
        where: {
            userId: userId,
        },
    });

    for (let i = 0; i < request.length; i++) {
        const req = request[i];
        if (req.status === "Pending") {
            return { pending: true, ...request[i] };
        }
    }

    return {
        pending: false,
        status: "",
        shopName: "",
        shopPhone: "",
        shopEmail: "",
        validDocs: "",
        address: "",
        city: "",
    };
}

export async function getPendingShopRequests() {
    const requests = await prisma.shopRequest.findMany({
        where: {
            status: "Pending",
        },
    });

    return requests;
}

export async function getAcceptedShopRequests() {
    const requests = await prisma.shopRequest.findMany({
        where: {
            status: "Accepted",
        },
    });

    return requests;
}

export async function getPreviousRequests() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;

    const requests = await prisma.shopRequest.findMany({
        where: {
            userId: userId,
        },
        take: 10,
    });

    return requests;
}

export async function getVerificationStatus() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    const { userId } = session.user;
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });

    const verification = await prisma.emailVerification.findFirst({
        where: {
            userId: userId,
        },
    });

    return verification?.status == "Verified";
}
