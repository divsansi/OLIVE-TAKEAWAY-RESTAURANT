import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const shopName = formData.get("shopName");
    const shopPhone = formData.get("shopPhone");
    const shopEmail = formData.get("shopEmail");
    const shopAddress = formData.get("shopAddress");
    const shopCity = formData.get("shopCity");
    const userId = formData.get("userId");

    // upload shop documents and get link
    const response = await fetch(
        "https://olivestakeaway.xoanon.uk/api/upload-to-s3",
        {
            method: "POST",
            body: formData,
        }
    );

    const { fileName } = await response.json();

    if (fileName) {
        try {
            const shop = await prisma.shopRequest.create({
                data: {
                    shopName: String(shopName),
                    shopPhone: String(shopPhone),
                    shopEmail: String(shopEmail),
                    address: String(shopAddress),
                    city: String(shopCity),
                    validDocs: String(fileName),
                    userId: String(userId),
                },
            });

            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/profile",
                },
            });
        } catch (error) {
            return new Response(null, {
                status: 302,
                headers: {
                    Location:
                        "/something-wrong?error=Error creating shop request",
                },
            });
        }
    } else {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Error uploading documents",
            },
        });
    }
};
