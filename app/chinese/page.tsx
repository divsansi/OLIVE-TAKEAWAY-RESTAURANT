import { getChineseItems } from "@/components/checkDatabase";
import ItemCard from "@/components/menuItemCard";

export default async function Home() {
    const items = await getChineseItems();

    return (
        <>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://unsplash.com/photos/8iiaALrjR54/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHwwfHx8MTcwNDMzNjI0MHww&force=true&w=1920)",
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            Chinese Qusines
                        </h1>
                        <p className="mb-5">
                            Chinese cuisine is known for its diverse flavors,
                            ingredients, cooking techniques, and regional
                            variations. It often emphasizes a balance of
                            flavors, textures, and colors, and it makes use of a
                            wide variety of ingredients such as rice, noodles,
                            vegetables, and meats.
                        </p>
                    </div>
                </div>
            </div>
            <div data-theme="mytheme" className="p-4">
                <h2 className="text-3xl font-bold text-center pt-16">
                    Chinese Flavours
                </h2>
                <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            itemId={item.id}
                            itemName={item.name}
                            itemPhoto={item.photoURL}
                            itemPrice={item.price}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
