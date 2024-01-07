import { getCartId } from "@/components/noAuth";
import { NextRequest } from "next/server";
import prisma from "@/utils/database";

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
    const formData = await request.formData();
    const orderId = formData.get("orderId");
    const status = formData.get("status");

    if (status == "Delivered") {
        console.log("Delivery");
        try {
            const orderFile = await prisma.order.findFirst({
                where: {
                    id: String(orderId),
                },
            });

            if (orderFile?.payment == "Cash") {
                console.log("Cash");
                // find order
                const order = await prisma.orderMenuItemFromUser.findMany({
                    where: {
                        orderId: String(orderId),
                    },
                });

                // find menu items
                let menuItems = [];
                for (let i = 0; i < order.length; i++) {
                    const item = order[i];

                    // find menu item
                    const menuItem = await prisma.menuItem.findFirst({
                        where: {
                            id: String(item.menuItemId),
                        },
                    });

                    menuItems.push(menuItem);
                }

                // find total
                let total = 0;
                for (let i = 0; i < menuItems.length; i++) {
                    const item = menuItems[i];

                    total += (item?.price ?? 0) * order[i].qty;
                }

                // find user
                const user = await prisma.user.findFirst({
                    where: {
                        id: order[0]?.userId ?? "",
                    },
                });

                const email = user?.email ?? "";

                // send email
                const templateId = "template_e0qolbo";
                const serviceId = "service_3vv8wgf";
                const public_key = "user_olO7m24BnPT39Tf7fR0xC";
                const private_key = "be19d4410869d50fa7a16b41000c46a7";

                console.log("Sent");

                const emailParams: EmailParams = {
                    to_name: user?.username ?? "",
                    to_email: user?.email ?? "",
                    oid: orderFile?.id ?? "",
                    total: total.toString(),
                    vat: "0",
                    tax: "0",
                    sub: total.toString(),
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
            }
        } catch (e) {
            console.log(e);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/something-wrong?error=Invalid Operation.",
                },
            });
        }
    }

    // Update the order status
    await prisma.order.update({
        where: {
            id: String(orderId),
        },
        data: {
            status: String(status),
        },
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/shop-order",
        },
    });
};
