import { NextRequest } from "next/server";
import prisma from "@/utils/database";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const menuId = formData.get("menuId");
    const itemName = formData.get("itemName");
    const itemDescription = formData.get("itemDescription");
    const itemPrice = formData.get("itemPrice");

    // check empty fields
    if (!menuId || !itemName || !itemDescription || !itemPrice) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Empty fields",
            },
        });
    }

    // send itemImage to /api/upload-to-s3 and get back the file name
    const response = await fetch(
        "https://olivestakeaway.xoanon.uk/api/upload-to-s3",
        {
            method: "POST",
            body: formData,
        }
    );

    const { fileName } = await response.json();

    // Create menu item
    try {
        if (fileName) {
            const menuItem = await prisma.menuItem.create({
                data: {
                    name: String(itemName),
                    description: String(itemDescription),
                    price: Number(itemPrice),
                    menuId: String(menuId),
                    photoURL: String(fileName),
                },
            });
        } else {
            const menuItem = await prisma.menuItem.create({
                data: {
                    name: String(itemName),
                    description: String(itemDescription),
                    price: Number(itemPrice),
                    menuId: String(menuId),
                },
            });
        }

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/shop",
            },
        });
    } catch (error) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Error creating menu item",
            },
        });
    }
};
