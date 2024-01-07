/* eslint-disable @next/next/no-img-element */

import { auth } from "@/auth/lucia";
import { getCartItems } from "@/components/checkDatabase";
import { getCartId } from "@/components/noAuth";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";

type CartItem = {
    id: string;
    name: string;
    price: number;
    qty: number;
};

export default async function Cart() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    if (!session) redirect("/login");

    const cartItems = await getCartItems();
    const cartId = await getCartId();

    let total = 0;
    let vat = 0;
    let discount = 0;
    cartItems.forEach((item) => {
        if (item) {
            total += (item as CartItem).price * item.qty;
        }
    });

    return (
        <>
            <section data-theme="mytheme">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <header className="text-center">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                                Your Cart
                            </h1>
                        </header>

                        <div className="mt-8">
                            <ul className="space-y-4">
                                {cartItems.map((item, index) => (
                                    <li
                                        className="flex items-center gap-4"
                                        key={index}
                                    >
                                        <img
                                            src={(item && item.photoURL) || ""}
                                            alt=""
                                            className="h-16 w-16 rounded object-cover"
                                        />

                                        <div>
                                            <h3 className="text-sm text-gray-900">
                                                {item && item.name} -{" "}
                                                {item && item.price} x{" "}
                                                {item && item.qty} = Rs.
                                                {item &&
                                                    (item.price ?? 0) *
                                                        item.qty}
                                            </h3>
                                        </div>

                                        <div className="flex flex-1 items-center justify-end gap-4">
                                            <form
                                                className="flex flex-row gap-2 justify-center items-center"
                                                method="POST"
                                                action="/api/update-qty"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="itemId"
                                                    value={
                                                        (item && item.id) || ""
                                                    }
                                                />
                                                <input
                                                    type="hidden"
                                                    name="cartId"
                                                    value={cartId}
                                                />
                                                <label
                                                    htmlFor="Line1Qty"
                                                    className=""
                                                >
                                                    {" "}
                                                    Quantity{" "}
                                                </label>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    name="qty"
                                                    defaultValue={
                                                        item && item.qty
                                                    }
                                                    className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                />

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    <span className="">
                                                        Update
                                                    </span>
                                                </button>
                                            </form>

                                            <form
                                                method="POST"
                                                action="/api/remove-from-cart"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="itemId"
                                                    value={
                                                        (item && item.id) || ""
                                                    }
                                                />
                                                <button
                                                    type="submit"
                                                    className="text-gray-600 transition hover:text-red-600"
                                                >
                                                    <span className="">
                                                        <FaRegTrashAlt />
                                                    </span>
                                                </button>
                                            </form>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                                <div className="w-screen max-w-lg space-y-4">
                                    <dl className="space-y-0.5 text-sm text-gray-700">
                                        <div className="flex justify-between">
                                            <dt>Subtotal</dt>
                                            <dd>Rs.{total}</dd>
                                        </div>

                                        <div className="flex justify-between">
                                            <dt>VAT</dt>
                                            <dd>Rs.{vat}</dd>
                                        </div>

                                        <div className="flex justify-between">
                                            <dt>Discount</dt>
                                            <dd>Rs.{discount}</dd>
                                        </div>

                                        <div className="flex justify-between !text-base font-medium">
                                            <dt>Total</dt>
                                            <dd>Rs.{total + vat - discount}</dd>
                                        </div>
                                    </dl>

                                    {/* <div className="flex justify-end">
                                        <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                                            <p className="whitespace-nowrap text-xs">
                                                2 Discounts Applied
                                            </p>
                                        </span>
                                    </div> */}

                                    <div className="flex justify-end">
                                        <form
                                            action="/api/place-order"
                                            method="POST"
                                            className="flex flex-col justify-end"
                                        >
                                            <input
                                                type="hidden"
                                                name="total"
                                                value={total}
                                            />
                                            <input
                                                type="hidden"
                                                name="vat"
                                                value={vat}
                                            />
                                            <input
                                                type="hidden"
                                                name="discount"
                                                value={discount}
                                            />
                                            <input
                                                type="hidden"
                                                name="cartId"
                                                value={cartId}
                                            />
                                            <input
                                                type="hidden"
                                                name="userId"
                                                value={session.user.userId}
                                            />
                                            {/* Radio Buttons for payment method Cash on Pickup, Paypal */}
                                            <div className="flex flex-col gap-4 m-4 justify-start">
                                                <div className="flex flex-row gap-2 ">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="cash"
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                                        defaultChecked
                                                    />
                                                    <label
                                                        htmlFor="Cash on Pickup"
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        Cash on Pickup
                                                    </label>
                                                </div>
                                                <div className="flex flex-row gap-2  ">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="paypal"
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                                    />
                                                    <label
                                                        htmlFor="Paypal"
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        Paypal
                                                    </label>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                            >
                                                Checkout
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
