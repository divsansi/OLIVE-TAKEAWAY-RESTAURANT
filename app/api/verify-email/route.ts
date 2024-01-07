import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const GET = async (request: NextRequest) => {
    const token = request.nextUrl.searchParams.get("token");

    // Check and update token
    try {
        const verification = await prisma.emailVerification.findFirst({
            where: {
                token: token ?? undefined,
            },
        });

        const update = await prisma.emailVerification.update({
            where: {
                id: verification?.id,
            },
            data: {
                status: "Verified",
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

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
};
