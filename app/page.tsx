/* eslint-disable @next/next/no-img-element */
import ItemCard from "@/components/menuItemCard";
import {
    getItalianItems,
    getSriLankanItems,
    getChineseItems,
    getBestSeller,
} from "@/components/checkDatabase";
import { noAuth } from "@/components/noAuth";

export default async function Home() {
    const italianItems = await getItalianItems(6);
    const sriLankanItems = await getSriLankanItems(6);
    const chineseItems = await getChineseItems(6);
    const mostOrder = await getBestSeller();
    const auth = await noAuth();

    return (
        <>
            <div className="hero px-0 bg-[url('https://unsplash.com/photos/poI7DelFiVA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHx8fDE3MDQ0NjI4Nzl8MA&force=true&w=1920')]">
                <div className="hero-content flex-col lg:flex-row-reverse gap-8 py-32 w-full h-full rounded-md backdrop-blur-md">
                    <img
                        src={
                            mostOrder?.photoURL ||
                            "https://diwi-fullstack-bucket.s3.us-west-1.amazonaws.com/41f795ed-70f8-7f6c-6fc6-3d53c1fd3893.png"
                        }
                        className="max-w-sm rounded-lg shadow-2xl"
                        alt="image"
                    />
                    <div className="text-white">
                        <h1 className="text-5xl font-bold">
                            Best Seller of the Week <br />{" "}
                            <span className="underline">{mostOrder?.name}</span>
                        </h1>
                        <p className="py-6 max-w-lg">
                            {mostOrder?.description}
                        </p>
                        <form
                            method="POST"
                            action="/api/add-to-cart"
                            className="mt-4"
                        >
                            <input
                                type="hidden"
                                name="itemId"
                                value={mostOrder?.id}
                            />
                            {auth ? (
                                <button
                                    type="submit"
                                    className=" btn btn-primary hover:scale-105"
                                >
                                    Add to Cart
                                </button>
                            ) : (
                                <a
                                    href="/login"
                                    className=" btn btn-primary hover:scale-105"
                                >
                                    Add to Cart
                                </a>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <div data-theme="mytheme" className="p-8 w-full">
                <h2 className="text-3xl font-bold text-center">
                    Italian Flavours
                </h2>
                <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {italianItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            itemId={item.id}
                            itemName={item.name}
                            itemPhoto={item.photoURL}
                            itemPrice={item.price}
                        />
                    ))}
                </div>
                <div className="w-full flex flex-row items-center justify-center p-4">
                    <a href="/italian" className="text-center">
                        View More
                    </a>
                </div>
                <h2 className="text-3xl font-bold text-center pt-16">
                    Sri Lankan Flavours
                </h2>
                <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sriLankanItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            itemId={item.id}
                            itemName={item.name}
                            itemPhoto={item.photoURL}
                            itemPrice={item.price}
                        />
                    ))}
                </div>

                <div className="w-full flex flex-row items-center justify-center p-4">
                    <a href="/sri-lankan" className="text-center">
                        View More
                    </a>
                </div>
                <h2 className="text-3xl font-bold text-center pt-16">
                    Chinese Flavours
                </h2>
                <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {chineseItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            itemId={item.id}
                            itemName={item.name}
                            itemPhoto={item.photoURL}
                            itemPrice={item.price}
                        />
                    ))}
                </div>
                <div className="w-full flex flex-row items-center justify-center p-4">
                    <a href="/chinese" className="text-center">
                        View More
                    </a>
                </div>
            </div>
        </>
    );
}
