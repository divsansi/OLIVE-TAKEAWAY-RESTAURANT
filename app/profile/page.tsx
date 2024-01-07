/* eslint-disable @next/next/no-img-element */
import {
    checkRestaurant,
    getPreviousRequests,
    getShopRequestPending,
    getShopStatus,
    getUserDetails,
    getVerificationStatus,
} from "@/components/checkDatabase";
import { noUnauth } from "@/components/noAuth";
import { redirect } from "next/navigation";

export default async function Profile() {
    const unauth = await noUnauth();
    if (unauth) redirect("/login");
    const user = await getUserDetails();

    const shopOpen = (await getShopStatus()) === "Open";
    const shopPending = await getShopRequestPending();
    const prevRequests = await getPreviousRequests();

    let shopDetails;
    if (shopOpen) {
        shopDetails = await checkRestaurant();
    }

    return (
        <div
            data-theme="mytheme"
            className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
            {/* User Details Card, name, username(read-only), email, mobile, role(read-only) */}
            <div className="col-span-1 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-center">
                        User Details
                    </h2>
                    {(await getVerificationStatus()) ? (
                        <div role="alert" className="alert alert-success my-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Your Profile has been verified!</span>
                        </div>
                    ) : (
                        <div role="alert" className="alert alert-error my-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>
                                Your Profile is not verified. Please check your
                                emails.
                            </span>
                        </div>
                    )}
                    <form
                        action="/api/update-user-data"
                        method="POST"
                        className="flex flex-col space-y-4"
                    >
                        <input type="hidden" name="userId" value={user?.id} />
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-bold">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="border-2 border-gray-200 rounded-lg p-2"
                                defaultValue={user?.name || ""}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-bold">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                className="border-2 border-gray-200 rounded-lg p-2"
                                defaultValue={user?.username || ""}
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-bold">Email</label>
                            <input
                                type="text"
                                name="email"
                                className="border-2 border-gray-200 rounded-lg p-2"
                                defaultValue={user?.email || ""}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-bold">Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                className="border-2 border-gray-200 rounded-lg p-2"
                                defaultValue={user?.mobile || ""}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-bold">Role</label>
                            <input
                                type="text"
                                name="role"
                                className="border-2 border-gray-200 rounded-lg p-2"
                                defaultValue={user?.role || ""}
                                readOnly
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary hover:scale-105 w-full"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
            {/* Shop Request Form Shop Name, Shop Phone, Shop Email, Registration Document ( File Upload ), Address, City */}
            {!shopOpen && !shopPending?.pending ? (
                <div className="col-span-1 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold text-center">
                            Shop Request
                        </h2>
                        <hr className="my-4" />
                        <form
                            encType="multipart/form-data"
                            action="/api/shop-request"
                            method="POST"
                            className="flex flex-col space-y-4"
                        >
                            <input
                                type="hidden"
                                name="userId"
                                value={user?.id}
                            />
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop Name
                                </label>
                                <input
                                    type="text"
                                    name="shopName"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop Phone
                                </label>
                                <input
                                    type="text"
                                    name="shopPhone"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop Email
                                </label>
                                <input
                                    type="text"
                                    name="shopEmail"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Registration Document
                                </label>
                                <input
                                    type="file"
                                    name="itemImage"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="shopAddress"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="shopCity"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    required
                                />
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary hover:scale-105 w-full"
                            >
                                Request
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {shopPending?.pending && (
                // Shop Request Pending Card
                <div className="col-span-1 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold text-center">
                            Shop Request
                        </h2>
                        <hr className="my-4" />
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop Name
                                </label>
                                <input
                                    type="text"
                                    name="shopName"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    defaultValue={shopPending?.shopName || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop Phone
                                </label>
                                <input
                                    type="text"
                                    name="shopPhone"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    defaultValue={shopPending?.shopPhone || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop Email
                                </label>
                                <input
                                    type="text"
                                    name="shopEmail"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    defaultValue={shopPending?.shopEmail || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Registration Document
                                </label>
                                <img
                                    src={shopPending?.validDocs || ""}
                                    alt=""
                                    className="h-64 w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="shopAddress"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    defaultValue={shopPending?.address || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="shopCity"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    defaultValue={shopPending?.city || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Shop Details Card, Shop Name, Shop Phone, Shop Email, Shop Address, Shop City, Shop Status */}
            {shopOpen && (
                <div className="col-span-1 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold text-center">
                            Shop Approved
                        </h2>
                        <p className="text-center">
                            {" "}
                            Shop details can be updated on{" "}
                            <a href="/shop">Shop Page</a>.
                        </p>
                        <hr className="my-4" />
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop Name
                                </label>
                                <input
                                    type="text"
                                    name="shopName"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    defaultValue={shopDetails?.[0]?.name || ""}
                                    readOnly
                                />
                                name{" "}
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop Phone
                                </label>
                                <input
                                    type="text"
                                    name="shopPhone"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    defaultValue={shopDetails?.[0]?.phone || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop Email
                                </label>
                                <input
                                    type="text"
                                    name="shopEmail"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    defaultValue={shopDetails?.[0]?.email || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop Address
                                </label>
                                <input
                                    type="text"
                                    name="shopAddress"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    defaultValue={
                                        shopDetails?.[0]?.address || ""
                                    }
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-bold">
                                    Shop City
                                </label>
                                <input
                                    type="text"
                                    name="shopCity"
                                    className="border-2 border-gray-200 rounded-lg p-2"
                                    defaultValue={shopDetails?.[0]?.city || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Previous Requests Card with Table Request shop name, status */}
            <div className="col-span-1 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-center">
                        Previous Requests
                    </h2>
                    <hr className="my-4" />
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Shop Name</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prevRequests?.map((item, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        {item.shopName}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {item.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
