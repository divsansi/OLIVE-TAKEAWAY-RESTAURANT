// app/api/login/route.ts
import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { LuciaError } from "lucia";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    // basic check
    if (
        typeof username !== "string" ||
        username.length < 1 ||
        username.length > 31
    ) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Invalid username",
            },
        });
    }
    if (
        typeof password !== "string" ||
        password.length < 1 ||
        password.length > 255
    ) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Invalid password",
            },
        });
    }
    try {
        // find user by key
        // and validate password
        const key = await auth.useKey(
            "username",
            username.toLowerCase(),
            password
        );
        const session = await auth.createSession({
            userId: key.userId,
            attributes: {},
        });
        const authRequest = auth.handleRequest(request.method, context);
        authRequest.setSession(session);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
            },
        });
    } catch (e) {
        if (
            e instanceof LuciaError &&
            (e.message === "AUTH_INVALID_KEY_ID" ||
                e.message === "AUTH_INVALID_PASSWORD")
        ) {
            // user does not exist or invalid password
            return new Response(null, {
                status: 302,
                headers: {
                    Location:
                        "/something-wrong?error=Invalid username or password",
                },
            });
        }
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Something went wrong",
            },
        });
    }
};
