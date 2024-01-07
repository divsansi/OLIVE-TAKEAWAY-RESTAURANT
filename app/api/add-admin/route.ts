import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const username = formData.get("username");

    // change role
    try {
        const user = await prisma.user.update({
            where: {
                username: String(username),
            },
            data: {
                role: "admin",
            },
        });
    } catch (error) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Wrong Username.",
            },
        });
    }

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/admin",
        },
    });
};
