import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const username = formData.get("username");
    const userId = formData.get("userId");

    // update user details
    const user = await prisma.user.update({
        where: {
            id: String(userId),
        },
        data: {
            name: String(name),
            email: String(email),
            mobile: String(mobile),
        },
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/profile",
        },
    });
};
