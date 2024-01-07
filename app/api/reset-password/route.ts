import { NextRequest } from "next/server";
import prisma from "@/utils/database";
import { auth } from "@/auth/lucia";

export const GET = async (request: NextRequest) => {
    const token = await request.nextUrl.searchParams.get("token");

    // Check and update token
    if (token)
        try {
            const verification = await prisma.passwordResetToken.findFirst({
                where: {
                    token: (token && String(token)) || "",
                },
            });

            const update = await prisma.passwordResetToken.update({
                where: {
                    id: verification?.id,
                },
                data: {
                    status: "Accepted",
                },
            });

            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/new-password?token=" + token ?? "",
                },
            });
        } catch (error) {
            console.log(error);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/something-wrong?error=Invalid token.",
                },
            });
        }
};

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const pass = formData.get("pass");
    const cpass = formData.get("cpass");
    const token = formData.get("token");

    console.log("Password: ", pass, "CPassword: ", cpass, "Token: ", token);

    if (!pass || !cpass || !token) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Invalid Operation.",
            },
        });
    }

    if (pass !== cpass) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Password does not match.",
            },
        });
    }

    // Check and update token
    try {
        const verification = await prisma.passwordResetToken.findFirst({
            where: {
                token: token && String(token),
            },
        });

        const uid = verification?.userId;

        const user = await prisma.user.findFirst({
            where: {
                id: uid && String(uid),
            },
        });

        const username = user?.username;

        if (uid && username && pass) {
            auth.updateKeyPassword("username", username, pass && String(pass));
        }

        await prisma.passwordResetToken.delete({
            where: {
                id: verification?.id,
            },
        });

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/login",
            },
        });
    } catch (error) {
        console.log(error);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Reset Failed.",
            },
        });
    }
};
