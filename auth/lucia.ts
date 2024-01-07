// auth/lucia.ts
import { PrismaClient } from "@prisma/client";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";

const client = new PrismaClient();

export const auth = lucia({
    adapter: prisma(client, {
        user: "user", // model User {}
        key: "key", // model Key {}
        session: "session", // model Session {}
    }),
    env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
    middleware: nextjs_future(),

    sessionCookie: {
        expires: false,
    },

    getUserAttributes: (data) => {
        return {
            userId: data.id,
            username: data.username,
        };
    },
});

export type Auth = typeof auth;
