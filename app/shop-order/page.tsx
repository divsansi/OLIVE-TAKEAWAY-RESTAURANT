/* eslint-disable @next/next/no-img-element */

import { redirect } from "next/navigation";
import { getShopOrderDetails, getShopStatus } from "@/components/checkDatabase";
import { noUnauth } from "@/components/noAuth";
import ShopOrder from "@/components/shopOrder";

export default async function TrackOrder() {
    const auth = await noUnauth();
    if (auth) redirect("/login");
    const shopStatus = await getShopStatus();
    if (shopStatus != "Open") redirect("/");

    const orderDetails = await getShopOrderDetails();

    // Filter out orders that are pending
    const pendingOrders = orderDetails.orderExport.filter(
        (item) => item.status === "Pending"
    );

    // Filter out orders that are accepted
    const acceptedOrders = orderDetails.orderExport.filter(
        (item) => item.status === "Accepted"
    );

    // Filter out orders that are preparing
    const preparingOrders = orderDetails.orderExport.filter(
        (item) => item.status === "Preparing"
    );

    // Filter out orders that are ready
    const readyOrders = orderDetails.orderExport.filter(
        (item) => item.status === "Ready"
    );

    // Filter out orders that are delivered
    const deliveredOrders = orderDetails.orderExport.filter(
        (item) => item.status === "Delivered"
    );

    // Filter out orders that are cancelled
    const cancelledOrders = orderDetails.orderExport.filter(
        (item) => item.status === "Cancelled"
    );

    return (
        <>
            <section data-theme="mytheme">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <div className="mt-8">
                            <h2 className="text-3xl font-bold text-center mb-4">
                                Pending Orders
                            </h2>
                            <ul className="space-y-4">
                                {pendingOrders.map((item, index) => (
                                    <ShopOrder
                                        item={item}
                                        key={index}
                                        index={index}
                                    />
                                ))}
                            </ul>
                            <hr className="my-8" />
                            <h2 className="text-3xl font-bold text-center mb-4">
                                Accepted Orders
                            </h2>
                            <ul className="space-y-4">
                                {acceptedOrders.map((item, index) => (
                                    <ShopOrder
                                        item={item}
                                        key={index}
                                        index={index}
                                    />
                                ))}
                            </ul>
                            <hr className="my-8" />
                            <h2 className="text-3xl font-bold text-center mb-4">
                                Preparing Orders
                            </h2>
                            <ul className="space-y-4">
                                {preparingOrders.map((item, index) => (
                                    <ShopOrder
                                        item={item}
                                        key={index}
                                        index={index}
                                    />
                                ))}
                            </ul>
                            <hr className="my-8" />
                            <h2 className="text-3xl font-bold text-center mb-4">
                                Ready Orders
                            </h2>
                            <ul className="space-y-4">
                                {readyOrders.map((item, index) => (
                                    <ShopOrder
                                        item={item}
                                        key={index}
                                        index={index}
                                    />
                                ))}
                            </ul>
                            <hr className="my-8" />
                            <h2 className="text-3xl font-bold text-center mb-4">
                                Delivered Orders
                            </h2>
                            <ul className="space-y-4">
                                {deliveredOrders.map((item, index) => (
                                    <ShopOrder
                                        item={item}
                                        key={index}
                                        index={index}
                                    />
                                ))}
                            </ul>
                            <hr className="my-8" />
                            <h2 className="text-3xl font-bold text-center mb-4">
                                Cancelled Orders
                            </h2>
                            <ul className="space-y-4">
                                {cancelledOrders.map((item, index) => (
                                    <ShopOrder
                                        item={item}
                                        key={index}
                                        index={index}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
