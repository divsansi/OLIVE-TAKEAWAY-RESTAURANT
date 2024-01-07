/* eslint-disable @next/next/no-img-element */
import DeliveryBadge from "./deliveryBadge";
import RatedStar from "./ratedStars";
import { FaRegMessage } from "react-icons/fa6";

type props = {
    index: number;
    item: any;
};

export default async function ShopOrder({ index, item }: props) {
    return (
        <li key={index} className="flex items-center gap-4">
            <img
                src={item.menuItem?.photoURL}
                alt=""
                className="h-16 w-16 rounded object-cover"
            />

            <div>
                <h3 className="text-sm text-gray-900">
                    {item && item.menuItem?.name} - Rs.
                    {item.menuItem && item.orderMenuItemFromUser
                        ? item.menuItem.price * item.orderMenuItemFromUser.qty
                        : 0}{" "}
                    <DeliveryBadge deliveryStatus={item.status} />
                </h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                        <dt className="inline">Person: </dt>
                        <dd className="inline">
                            @{item.user?.username} - {item.user?.name}
                        </dd>
                    </div>

                    <div>
                        <dt className="inline">Contact:</dt>
                        <dd className="inline">
                            {item.user?.mobile} -or- {item.user?.email}
                        </dd>
                    </div>
                </dl>
            </div>

            <form
                action="/api/update-order-status"
                method="POST"
                className="flex flex-1 items-center justify-end gap-2"
            >
                <input type="hidden" name="orderId" value={item.id} />
                {item.status != "Delivered" && item.status != "Cancelled" ? (
                    <div>
                        <label className="sr-only"> Status </label>

                        <select
                            name="status"
                            id="status"
                            className="h-8 w-32 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 focus:outline-none"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Ready">Ready</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                ) : (
                    <></>
                )}
                {item.status != "Delivered" && item.rated == true ? (
                    <RatedStar orderRating={item.orderRating?.rating || 0} />
                ) : (
                    <></>
                )}
                <div>
                    <label className="sr-only"> Quantity </label>

                    <input
                        type="number"
                        min="1"
                        value={item.orderMenuItemFromUser?.qty}
                        readOnly
                        id="Line1Qty"
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </div>

                {item.status != "Delivered" && item.status != "Cancelled" ? (
                    <button
                        type="submit"
                        className="text-gray-600 transition hover:text-green-600"
                    >
                        <span>Update</span>
                    </button>
                ) : (
                    <></>
                )}
            </form>
            {item.status != "Delivered" && item.status != "Cancelled" ? (
                <a
                    href={
                        "/chat?orderId=" +
                        item.id +
                        "&userName=" +
                        item.orderMenuItemFromUser?.restaurantId
                    }
                    className="text-gray-600 transition hover:text-green-600"
                >
                    <span>
                        <FaRegMessage />
                    </span>
                </a>
            ) : (
                <></>
            )}
        </li>
    );
}
