// app/api/signup/route.ts
import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import prisma from "@/utils/database";

import type { NextRequest } from "next/server";

type EmailParams = {
    to_name: string;
    verification_link: string;
    to_email: string;
};

const generateUUID = () => {
    let d = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);

            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );

    return uuid;
};

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const cpassword = formData.get("cpassword");

    // basic check
    if (
        typeof username !== "string" ||
        username.length < 4 ||
        username.length > 31
    ) {
        return new Response(null, {
            status: 302,
            headers: {
                Location:
                    "/something-wrong?error=Invalid username. Username must be between 4 and 31 characters.",
            },
        });
    }
    if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255
    ) {
        return new Response(null, {
            status: 302,
            headers: {
                Location:
                    "/something-wrong?error=Invalid password. Password must be between 6 and 255 characters.",
            },
        });
    }
    if (password !== cpassword) {
        return new Response(null, {
            status: 302,
            headers: {
                Location:
                    "/something-wrong?error=Passwords do not match. Please check your password.",
            },
        });
    }
    try {
        const user = await auth.createUser({
            key: {
                providerId: "username", // auth method
                providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                password, // hashed by Lucia
            },
            attributes: {
                username,
            },
        });
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
        });
        const authRequest = auth.handleRequest(request.method, context);
        authRequest.setSession(session);

        // Update user email
        const userUpdate = await prisma.user.update({
            where: {
                id: user.userId,
            },
            data: {
                email: email ? email.toString() : null,
            },
        });

        // Send email verification
        const serviceId = "service_3vv8wgf";
        const templateId = "template_giutcpw";
        const public_key = "user_olO7m24BnPT39Tf7fR0xC";
        const verificationToken = generateUUID();

        await prisma.emailVerification.create({
            data: {
                userId: user.userId,
                token: verificationToken,
            },
        });

        const params: EmailParams = {
            to_name: user.username || "",
            verification_link: `https://olivestakeaway.xoanon.uk/api/verify-email?token=${verificationToken}`,
            to_email: email ? email.toString() : "",
        };

        // Post to email service
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: public_key,
                template_params: params,
                accessToken: "be19d4410869d50fa7a16b41000c46a7",
            }),
        });

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
            },
        });
    } catch (e) {
        console.log(e);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Error registering user.",
            },
        });
    }
};
