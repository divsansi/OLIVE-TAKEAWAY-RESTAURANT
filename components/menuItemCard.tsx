/* eslint-disable @next/next/no-img-element */
import {
    checkCart,
    checkWishlist,
    getCartItems,
    getWishlistItems,
} from "./checkDatabase";
import { noAuth } from "./noAuth";

type props = {
    itemId: string;
    itemName: string;
    itemPrice: number;
    itemPhoto: string | null;
};

import { FaCartPlus } from "react-icons/fa";
import { CiBookmark, CiBookmarkMinus, CiBookmarkPlus } from "react-icons/ci";

export default async function ItemCard({
    itemId,
    itemName,
    itemPhoto,
    itemPrice,
}: props) {
    const auth = await noAuth();
    let cartItems;
    let wishlistItems;
    if (auth) {
        cartItems = await getCartItems();
        wishlistItems = await getWishlistItems();
        await checkCart();
        await checkWishlist();
    }

    let wishlist = false;
    let cart = false;

    if (auth && cartItems && wishlistItems) {
        cartItems.forEach((item) => {
            if (item && item.id === itemId) {
                cart = true;
            }
        });

        wishlistItems.forEach((item) => {
            if (item && item.id === itemId) {
                wishlist = true;
            }
        });
    }

    return (
        <a
            data-theme="mytheme"
            href="#"
            className="group relative block overflow-hidden"
        >
            <form method="POST" action="/api/add-to-wishlist">
                <input type="hidden" name="itemId" value={itemId} />
                {wishlist ? (
                    <button
                        type="submit"
                        className="absolute end-4 top-4 z-10 rounded-full bg-red-600 p-1.5 text-white transition hover:text-gray-900/75"
                    >
                        <CiBookmarkMinus />
                        <span className="sr-only">Wishlist</span>
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
                    >
                        <CiBookmarkPlus />
                        <span className="sr-only">Wishlist</span>
                    </button>
                )}
            </form>

            <img
                src={
                    itemPhoto
                        ? itemPhoto
                        : "https://diwi-fullstack-bucket.s3.us-west-1.amazonaws.com/41f795ed-70f8-7f6c-6fc6-3d53c1fd3893.png"
                }
                alt=""
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-gray-100 bg-white p-6">
                <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                    {" "}
                    New{" "}
                </span>

                <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {itemName}
                </h3>

                <p className="mt-1.5 text-sm text-gray-700">Rs.{itemPrice}</p>
                {auth ? (
                    <form
                        method="POST"
                        action="/api/add-to-cart"
                        className="mt-4"
                    >
                        <input type="hidden" name="itemId" value={itemId} />
                        {cart ? (
                            <a
                                href="/cart"
                                className="w-full btn btn-primary hover:scale-105"
                            >
                                View Cart
                            </a>
                        ) : (
                            <button
                                type="submit"
                                className="w-full btn btn-primary hover:scale-105"
                            >
                                <FaCartPlus /> Add to Cart
                            </button>
                        )}
                    </form>
                ) : (
                    <a
                        href="/login"
                        className="w-full btn btn-primary hover:scale-105 mt-4"
                    >
                        <FaCartPlus />
                        Add to Cart
                    </a>
                )}
            </div>
        </a>
    );
}
