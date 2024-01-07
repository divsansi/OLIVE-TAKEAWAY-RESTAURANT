"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function Profile({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const orderId = searchParams?.["orderId"] ?? "";
    const userId = searchParams?.["userId"] ?? "";
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);

    const formData = new FormData();

    // Append key-value pairs to the FormData object
    formData.append("orderId", orderId && String(orderId));
    formData.append("userId", userId && String(userId));

    // Make a POST request using fetch
    fetch("/api/get-cart-total", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            setCartTotal(data.total);
        })
        .catch((error) => {
            console.error("Error:", error);
            redirect("/something-wrong?error=API Response Error");
        });

    const paypalOptions = {
        clientId:
            "Afrc_OFyFORP3J-8rdDFNId9twxhEsyMBTdmNY5EJ_CaQwrek3gCDtA2hOfpW434IE5wMP7JxtZ8ExJh",
    };

    const addPaypalScript = () => {
        if (window.paypal) {
            setScriptLoaded(true);
            return;
        } else {
            const script = document.createElement("script");
            script.src = `https://www.paypal.com/sdk/js?client-id=${paypalOptions.clientId}`;
            script.type = "text/javascript";
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            document.body.appendChild(script);
        }
    };

    useEffect(() => {
        addPaypalScript();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const caltotal = () => {
        return String((cartTotal / 320).toFixed(2));
    };

    return (
        <div
            data-theme="mytheme"
            className="w-full min-h-screen m-0 flex flex-row"
        >
            <div className=" max-w-2xl min-w-lg mx-auto p-8 shadow-md flex flex-col self-center gap-4">
                <h1 className="text-3xl font-bold text-center">Payment</h1>
                {cartTotal != 0 ? (
                    <h3 className="text-md  text-center">
                        Total Ammount: ${caltotal()}
                    </h3>
                ) : (
                    <h3 className="text-md  text-center">
                        Payment Completed. Track your order{" "}
                        <a
                            className=" text-blue-400 hover:text-blue-600"
                            href="/track-order"
                        >
                            here
                        </a>
                        .
                    </h3>
                )}

                {scriptLoaded ? (
                    <PayPalButton
                        amount={caltotal()}
                        currency="USD"
                        onSuccess={(
                            details: {
                                payer: { name: { given_name: string } };
                            },
                            data: { orderID: any }
                        ) => {
                            console.log(
                                "Transaction completed by " +
                                    details.payer.name.given_name
                            );

                            return fetch(
                                "https://olivestakeaway.xoanon.uk/api/unhold-order",
                                {
                                    method: "post",
                                    body: JSON.stringify({
                                        userId,
                                        ammount: cartTotal,
                                        orderId,
                                        details,
                                    }),
                                }
                            );
                        }}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
