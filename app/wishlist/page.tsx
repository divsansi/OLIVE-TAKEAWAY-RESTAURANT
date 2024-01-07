/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import { checkWishlist, getWishlistItems } from "@/components/checkDatabase";
import { noUnauth } from "@/components/noAuth";
import { FaCartPlus, FaRegTrashAlt } from "react-icons/fa";

export default async function WishList() {
    const auth = await noUnauth();
    if (auth) redirect("/login");

    const wishlist = await checkWishlist();
    const wishlistItems = await getWishlistItems();

    return (
        <>
            <section data-theme="mytheme">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <header className="text-center">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                                Your Favourits
                            </h1>
                        </header>

                        <div className="mt-8">
                            <ul className="space-y-4">
                                {wishlistItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-4"
                                    >
                                        <img
                                            src={(item && item.photoURL) || ""}
                                            alt=""
                                            className="h-16 w-16 rounded object-cover"
                                        />

                                        <div>
                                            <h3 className="text-sm text-gray-900">
                                                {item && item.name} - Rs.
                                                {item && item.price}
                                            </h3>
                                        </div>
                                        <div className="flex flex-row gap-4 justify-end w-full">
                                            <form
                                                method="POST"
                                                action="/api/add-to-cart"
                                                className="flex items-center justify-end gap-2"
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
                                                    className="text-gray-600 transition hover:text-green-600"
                                                >
                                                    <span>
                                                        <FaCartPlus />
                                                    </span>
                                                </button>
                                            </form>
                                            <form
                                                method="POST"
                                                action="/api/remove-from-wishlist"
                                                className="flex items-center justify-end gap-2"
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
                                                    <span>
                                                        <FaRegTrashAlt />
                                                    </span>
                                                </button>
                                            </form>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
