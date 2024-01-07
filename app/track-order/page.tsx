/* eslint-disable @next/next/no-img-element */

import { redirect } from "next/navigation";
import { getOrderDetails } from "@/components/checkDatabase";
import { noUnauth } from "@/components/noAuth";
import OrderTrack from "@/components/orderTrack";

export default async function TrackOrder() {
    const auth = await noUnauth();
    if (auth) redirect("/login");

    const orderDetails = await getOrderDetails();

    // Filter orderDetails which doesn't have status Delivered or Cancelled
    const onGoingOrders = orderDetails.orderExport.filter(
        (item) => item.status !== "Delivered" && item.status !== "Cancelled"
    );

    // Filter orderDetails which have status Delivered
    const deliveredOrders = orderDetails.orderExport.filter(
        (item) => item.status === "Delivered"
    );

    // Filter orderDetails which have status Cancelled
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
                                OnGoing Orders
                            </h2>
                            <ul className="space-y-4">
                                {onGoingOrders.map((item, index) => (
                                    <OrderTrack
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
                                    <OrderTrack
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
                                    <OrderTrack
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
