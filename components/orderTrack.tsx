/* eslint-disable @next/next/no-img-element */
import { FaRegMessage } from "react-icons/fa6";
import DeliveryBadge from "./deliveryBadge";
import RatingStars from "./ratingStars";
import RatedStar from "./ratedStars";

type props = {
    index: number;
    item: any;
};

export default async function OrderTrack({ index, item }: props) {
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
                        <dt className="inline">Restaurant:</dt>
                        <dd className="inline">{item.restaurant?.name}</dd>
                    </div>

                    <div>
                        <dt className="inline">Contact:</dt>
                        <dd className="inline">{item.restaurant?.phone}</dd>
                    </div>
                </dl>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
                {!item.rated && item.status == "Delivered" ? (
                    <RatingStars
                        orderId={item.id}
                        userId={item.orderMenuItemFromUser.userId}
                        restaurantId={item.orderMenuItemFromUser.restaurantId}
                    />
                ) : (
                    <RatedStar orderRating={item.orderRating?.rating || 1} />
                )}
                <form>
                    <label className="sr-only"> Quantity </label>

                    <input
                        type="number"
                        min="1"
                        value={item.orderMenuItemFromUser?.qty}
                        id="Line1Qty"
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </form>

                {item.status != "Delivered" && item.status != "Cancelled" ? (
                    <a
                        href={
                            "/chat?orderId=" +
                            item.id +
                            "&userName=" +
                            item.orderMenuItemFromUser.userId
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
            </div>
        </li>
    );
}
