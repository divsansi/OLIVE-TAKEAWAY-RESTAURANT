import { NextRequest } from "next/server";
import prisma from "@/utils/database";

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
    const userId = formData.get("userId");

    // find user
    const user = await prisma.user.findFirst({
        where: {
            id: userId ? String(userId) : undefined,
        },
    });

    if (!user) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Invalid username.",
            },
        });
    }

    const email = user?.email;

    const serviceId = "service_3vv8wgf";
    const templateId = "template_giutcpw";
    const public_key = "user_olO7m24BnPT39Tf7fR0xC";
    const verificationToken = generateUUID();
    const private_key = "be19d4410869d50fa7a16b41000c46a7";

    const emailParams: EmailParams = {
        to_name: user?.username ?? "",
        verification_link: `https://olivestakeaway.xoanon.uk/api/reset-password?token=${verificationToken}`,
        to_email: email ?? "",
    };

    // Add token to database
    await prisma.passwordResetToken.create({
        data: {
            token: verificationToken,
            userId: user?.id,
        },
    });

    // Send email
    const response = await fetch(
        `https://api.emailjs.com/api/v1.0/email/send`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${private_key}`,
            },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: public_key,
                template_params: emailParams,
                accessToken: private_key,
            }),
        }
    );

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
};
