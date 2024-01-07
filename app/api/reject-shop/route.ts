import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const requestId = formData.get("requestId");

    // Update shop request
    const shopRequest = await prisma.shopRequest.update({
        where: {
            id: String(requestId),
        },
        data: {
            status: "Rejected",
        },
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/admin",
        },
    });
};
