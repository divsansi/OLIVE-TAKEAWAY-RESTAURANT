type props = {
    orderRating: number;
};

export default function RatedStar({ orderRating }: props) {
    let jsx = (
        <form
            className="flex flex-row gap-4 justify-center items-center px-4"
            method="POST"
            action="/api/rate-order"
        >
            <div className="rating">
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={orderRating == 1}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={orderRating == 2}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={orderRating == 3}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={orderRating == 4}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={orderRating == 5}
                />
            </div>
        </form>
    );

    return jsx;
}
