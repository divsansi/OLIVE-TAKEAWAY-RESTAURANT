/* eslint-disable @next/next/no-img-element */
import {
    getAcceptedShopRequests,
    getPendingShopRequests,
    getShopRequestPending,
    getUserDetails,
} from "@/components/checkDatabase";
import { noUnauth } from "@/components/noAuth";
import { redirect } from "next/navigation";

export default async function Profile() {
    const unauth = await noUnauth();
    if (unauth) redirect("/login");
    const user = await getUserDetails();
    if (user?.role !== "admin") redirect("/");

    const pendingRequests = await getPendingShopRequests();
    const acceptedRequests = await getAcceptedShopRequests();

    return (
        <div className="w-full" data-theme="mytheme">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
                <header className="text-center">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                        Admin Panel
                    </h1>
                </header>
                {/* Pending Restaurants Table, Name, Mobile, Email, ValidDoc, Address, City */}
                <div className="mt-8">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        Pending Restaurants
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Mobile</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Valid Doc</th>
                                    <th className="px-4 py-2">Address</th>
                                    <th className="px-4 py-2">City</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingRequests.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">
                                            {item.shopName}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {item.shopPhone}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {item.shopEmail}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <img
                                                src={item.validDocs}
                                                alt="validation"
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
                                            {item.address}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {item.city}
                                        </td>
                                        <td className="border px-4 py-2 ">
                                            <div className="flex flex-col gap-4 h-full">
                                                <form
                                                    action="/api/accept-shop"
                                                    method="POST"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="shopName"
                                                        value={item.shopName}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="userId"
                                                        value={item.userId}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="shopPhone"
                                                        value={item.shopPhone}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="shopEmail"
                                                        value={item.shopEmail}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="shopAddress"
                                                        value={item.address}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="shopCity"
                                                        value={item.city}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="requestId"
                                                        value={item.id}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success w-full"
                                                    >
                                                        Accept
                                                    </button>
                                                </form>
                                                <form
                                                    action="/api/reject-shop"
                                                    method="POST"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="requestId"
                                                        value={item.id}
                                                    />
                                                    <button className="btn btn-danger w-full">
                                                        Reject
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Accepted Restaurants Table, Name, Mobile, Email, ValidDoc, Address, City, Suspend Button */}
                <div className="mt-32">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        Accepted Restaurants
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Mobile</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Valid Doc</th>
                                    <th className="px-4 py-2">Address</th>
                                    <th className="px-4 py-2">City</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acceptedRequests.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">
                                            {item.shopName}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {item.shopPhone}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {item.shopEmail}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <img
                                                src={item.validDocs}
                                                alt="validation"
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
                                            {item.address}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {item.city}
                                        </td>
                                        <td className="border px-4 py-2 ">
                                            <div className="flex flex-col gap-4 h-full">
                                                <form
                                                    action="/api/suspend-shop"
                                                    method="POST"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="userId"
                                                        value={item.userId}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="requestId"
                                                        value={item.id}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-danger w-full"
                                                    >
                                                        Suspend
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Add New admin form. username */}
                <div className="mt-32">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        Add New Admin
                    </h2>
                    <form
                        action="/api/add-admin"
                        method="POST"
                        className="flex flex-col gap-4 max-w-lg p-4 mx-auto"
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered w-full"
                            name="username"
                            required
                        />
                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                        >
                            Make Admin
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
