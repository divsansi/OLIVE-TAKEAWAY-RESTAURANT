import { getItalianItems } from "@/components/checkDatabase";
import ItemCard from "@/components/menuItemCard";

export default async function Home() {
    const items = await getItalianItems();

    return (
        <>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://unsplash.com/photos/o1EDsUFmuXQ/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGl0YWxpYW4lMjBmb29kfGVufDB8fHx8MTcwNDMzNTQ0OXww&force=true&w=1920)",
                }}
            >
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            Italian Qusines
                        </h1>
                        <p className="mb-5">
                            Italian food is known for its variety, taste, and
                            quality. Some say it&quote;s the best in the world
                            because of its high-quality ingredients, simple
                            preparation, and passion.
                        </p>
                    </div>
                </div>
            </div>
            <div data-theme="mytheme" className="p-4">
                <h2 className="text-3xl font-bold text-center">
                    Italian Flavours
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
