import { noUnauth } from "@/components/noAuth";
import { redirect } from "next/navigation";
import {
    checkRestaurant,
    getMenus,
    getShopStatus,
} from "@/components/checkDatabase";
import prisma from "@/utils/database";

export default async function Shop() {
    const unauth = await noUnauth();
    if (unauth) redirect("/login");
    const shopStatus = await getShopStatus();
    if (shopStatus != "Open") redirect("/");

    const restaurant = await checkRestaurant();
    const menus = await getMenus();

    const menuItems: {
        menu: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            type: string;
            restaurantId: string | null;
        };
        menuItem: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            price: number;
            menuId: string | null;
        }[];
    }[] = [];

    for (let i = 0; i < menus.length; i++) {
        const menuItem = await prisma.menuItem.findMany({
            where: {
                menuId: menus[i].id,
            },
        });
        menuItems.push({ menu: menus[i], menuItem });
    }

    return (
        <div
            data-theme="mytheme"
            className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
            {/* Show all menus and items count in it + Delete button ( form ) using table */}
            <div className="col-span-3">
                <div className="flex flex-col gap-4 rounded-md shadow-md p-8 bg-white">
                    <h2 className="text-2xl font-bold">Menus</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Menu Name</th>
                                <th className="px-4 py-2">Menu Description</th>
                                <th className="px-4 py-2">Menu Type</th>
                                <th className="px-4 py-2">Items</th>
                                <th className="px-4 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map((menu) => (
                                <tr key={menu.id}>
                                    <td className="border px-4 py-2">
                                        {menu.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {menu.description}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {menu.type}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {menuItems.map((menuItem) => {
                                            if (menuItem.menu.id === menu.id) {
                                                return menuItem.menuItem.length;
                                            }
                                        })}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <form
                                            action="/api/menu-delete"
                                            method="POST"
                                        >
                                            <input
                                                type="hidden"
                                                name="menuId"
                                                value={menu.id}
                                            />
                                            <button
                                                type="submit"
                                                className="btn btn-warning w-full"
                                            >
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* show all menuItems (name, price, menu, description ) and delete button using table */}
            <div className="col-span-3">
                <div className="flex flex-col gap-4 rounded-md shadow-md p-8 bg-white">
                    <h2 className="text-2xl font-bold">Menu Items</h2>
                    <div className="w-full max-h-lg overflow-scroll">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Item Name</th>
                                    <th className="px-4 py-2">
                                        Item Description
                                    </th>
                                    <th className="px-4 py-2">Item Price</th>
                                    <th className="px-4 py-2">Menu</th>
                                    <th className="px-4 py-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuItems.map((menuItem) =>
                                    menuItem.menuItem.map((item) => (
                                        <tr key={item.id}>
                                            <td className="border px-4 py-2">
                                                {item.name}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {item.description}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {item.price}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {menuItem.menu.name}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <form
                                                    action="/api/menu-item-delete"
                                                    method="POST"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="itemId"
                                                        value={item.id}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-warning w-full"
                                                    >
                                                        Delete
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex flex-col gap-4 rounded-md shadow-md p-8 bg-white">
                    <h2 className="text-2xl font-bold">Shop Details</h2>
                    <form
                        action="/api/shop-details"
                        method="post"
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="hidden"
                            name="shopId"
                            value={restaurant[0].id}
                        />
                        {/* Shop Name, Shop Address, City */}
                        <div className="flex flex-col gap-4">
                            <label htmlFor="shopName">Shop Name</label>
                            <input
                                type="text"
                                name="shopName"
                                id="shopName"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Shop Name"
                                defaultValue={restaurant[0].name || ""}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="shopAddress">Shop Address</label>
                            <input
                                type="text"
                                name="shopAddress"
                                id="shopAddress"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Street Address"
                                defaultValue={restaurant[0].address || ""}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="shopCity">Shop City</label>
                            <input
                                type="text"
                                name="shopCity"
                                id="shopCity"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Colombo"
                                defaultValue={restaurant[0].city || ""}
                            />
                        </div>
                        {/* Phone, Email */}
                        <div className="flex flex-col gap-4">
                            <label htmlFor="shopPhone">Shop Phone</label>
                            <input
                                type="text"
                                name="shopPhone"
                                id="shopPhone"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Shop Phone"
                                defaultValue={restaurant[0].phone || ""}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="shopEmail">Shop Email</label>
                            <input
                                type="email"
                                name="shopEmail"
                                id="shopEmail"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Shop Email"
                                defaultValue={restaurant[0].email || ""}
                            />
                        </div>
                        {/* Update button */}
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                </div>
            </div>
            {/* Create Menu (Name, Description, Type: ( Itaian Flavours, Sri Lankan Flavours, Chinese Flavours ),  ) */}
            <div>
                <div className="flex flex-col gap-4 rounded-md shadow-md p-8 bg-white">
                    <h2 className="text-2xl font-bold">Create Menu</h2>
                    <form
                        action="/api/menu-details"
                        method="POST"
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="hidden"
                            name="shopId"
                            value={restaurant[0].id}
                        />
                        <div className="flex flex-col gap-4">
                            <label htmlFor="menuName">Menu Name</label>
                            <input
                                type="text"
                                name="menuName"
                                id="menuName"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Menu Name"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="menuDescription">
                                Menu Description
                            </label>
                            <input
                                type="text"
                                name="menuDescription"
                                id="menuDescription"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Menu Description"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="menuType">Menu Type</label>
                            <select
                                name="menuType"
                                id="menuType"
                                className="border border-gray-300 rounded-md px-4 py-2"
                            >
                                <option value="Italian">
                                    Italian Flavours
                                </option>
                                <option value="Sri-Lankan">
                                    Sri Lankan Flavours
                                </option>
                                <option value="Chinese">
                                    Chinese Flavours
                                </option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>
            {/* Create menu item. menu dropdown, item name, item description, item price, image */}
            <div>
                <div className="flex flex-col gap-4 rounded-md shadow-md p-8 bg-white">
                    <h2 className="text-2xl font-bold">Create Menu Item</h2>
                    <form
                        action="/api/menu-item"
                        method="POST"
                        className="flex flex-col gap-4"
                        encType="multipart/form-data"
                    >
                        <div className="flex flex-col gap-4">
                            <label htmlFor="menuId">Menu</label>
                            <select
                                name="menuId"
                                id="menuId"
                                className="border border-gray-300 rounded-md px-4 py-2"
                            >
                                {menus.map((menu) => (
                                    <option key={menu.id} value={menu.id}>
                                        {menu.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="itemName">Item Name</label>
                            <input
                                type="text"
                                name="itemName"
                                id="itemName"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Item Name"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="itemDescription">
                                Item Description
                            </label>
                            <input
                                type="text"
                                name="itemDescription"
                                id="itemDescription"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Item Description"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="itemPrice">Item Price</label>
                            <input
                                type="number"
                                name="itemPrice"
                                id="itemPrice"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Item Price"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="itemImage">Item Image</label>
                            <input
                                type="file"
                                name="itemImage"
                                id="itemImage"
                                className="border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Item Image"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
