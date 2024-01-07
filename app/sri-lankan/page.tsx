import { getSriLankanItems } from "@/components/checkDatabase";
import ItemCard from "@/components/menuItemCard";

export default async function Home() {
    const items = await getSriLankanItems();

    return (
        <>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://unsplash.com/photos/EXHIHvJu4VU/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8c3JpJTIwbGFua2FuJTIwZm9vZHxlbnwwfDB8fHwxNzA0MzM1NjQ4fDA&force=true&w=1920)",
                }}
            >
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            Sri Lankan Qusines
                        </h1>
                        <p className="mb-5">
                            Sri Lankan cuisine is known for its particular
                            combinations of herbs, spices, fish, vegetables,
                            rices, and fruits. The cuisine is highly centered
                            around many varieties of rice, as well as coconut
                            which is a ubiquitous plant throughout the country.
                        </p>
                    </div>
                </div>
            </div>
            <div data-theme="mytheme" className="p-4">
                <h2 className="text-3xl font-bold text-center pt-16">
                    Sri Lankan Flavours
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
