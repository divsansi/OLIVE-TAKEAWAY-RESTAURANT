import { MdDone } from "react-icons/md";

type props = {
    orderId: string;
    restaurantId: string;
    userId: string;
};

export default function RatingStars({ orderId, restaurantId, userId }: props) {
    return (
        <form
            className="flex flex-row gap-4 justify-center items-center px-4"
            method="POST"
            action="/api/rate-order"
        >
            <input type="hidden" name="orderId" value={orderId} />
            <input type="hidden" name="restaurantId" value={restaurantId} />
            <input type="hidden" name="userId" value={userId} />
            <div className="rating">
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    value={1}
                    defaultChecked
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    value={2}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    value={3}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    value={4}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    value={5}
                />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
                <MdDone />
            </button>
        </form>
    );
}
