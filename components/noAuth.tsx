import { auth } from "@/auth/lucia";
import * as context from "next/headers";

import prisma from "@/utils/database";

export async function noAuth() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    if (session) return true;
    else return false;
}

export async function noUnauth() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    if (!session) return true;
    else return false;
}

export async function getCartId() {
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

        return cart.id;
    }

    return cart[0].id;
}

export async function getWishlistId() {
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

        return wishlist.id;
    }

    return wishlist[0].id;
}
