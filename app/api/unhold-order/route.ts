import { NextRequest } from "next/server";

type dataSet = {
    userId: String;
    orderId: String;
    ammount: String;
    details: {
        id: String;
        intent: String;
        status: String;
        purchase_units: [Object];
        payer: {
            name: Object;
            email_address: String;
            payer_id: String;
            address: Object;
        };
        create_time: String;
        update_time: String;
        links: Object;
    };
};

type EmailParams = {
    to_name: string;
    to_email: string;
    oid: string;
    total: string;
    vat: string;
    tax: string;
    sub: string;
};

export const POST = async (request: NextRequest) => {
    const data = await request.json();

    const userId = data.userId;
    console.log(data);
    if (data.details.status != "COMPLETED" || !userId) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Payment not completed.",
            },
        });
    }

    try {
        // get hold order
        const holdOrder = await prisma?.orderMenuItemFromUserHold.findFirst({
            where: {
                id: data.orderId,
            },
        });

        const order = await prisma?.orderMenuItemFromUser.create({
            data: {
                menuItemId: holdOrder?.menuItemId,
                qty: holdOrder?.qty,
                userId: holdOrder?.userId,
                orderId: holdOrder?.orderId,
                restaurantId: holdOrder?.restaurantId,
            },
        });

        // Delete hold order
        await prisma?.orderMenuItemFromUserHold.delete({
            where: {
                id: data.orderId,
            },
        });

        const user = await prisma?.user.findFirst({
            where: {
                id: userId,
            },
        });

        const templateId = "template_e0qolbo";
        const serviceId = "service_3vv8wgf";
        const public_key = "user_olO7m24BnPT39Tf7fR0xC";
        const private_key = "be19d4410869d50fa7a16b41000c46a7";

        const emailParams: EmailParams = {
            to_name: user?.username ?? "",
            to_email: user?.email ?? "",
            oid: order?.id ?? "",
            total: data.ammount,
            vat: "0",
            tax: "0",
            sub: data.ammount,
        };

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
                Location: "/track-order",
            },
        });
    } catch (error) {
        console.log(error);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/something-wrong?error=Error creating order.",
            },
        });
    }
};
