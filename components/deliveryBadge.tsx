type props = {
    deliveryStatus: string;
};

export default function DeliveryBadge({ deliveryStatus }: props) {
    switch (deliveryStatus) {
        case "Pending":
            return (
                <span className="badge badge-ghost">
                    <span>Pending</span>
                </span>
            );
        case "Accepted":
            return (
                <span className="badge badge-primary">
                    <span>Accepted</span>
                </span>
            );
        case "Preparing":
            return (
                <span className="badge badge-info">
                    <span>Preparing</span>
                </span>
            );
        case "Ready":
            return (
                <span className="badge badge-warning">
                    <span>Ready</span>
                </span>
            );
        case "Delivered":
            return (
                <span className="badge badge-success">
                    <span>Delivered</span>
                </span>
            );
        case "Cancelled":
            return (
                <span className="badge badge-danger">
                    <span>Cancelled</span>
                </span>
            );
        default:
            return (
                <span className="badge badge-ghost">
                    <span>On the way</span>
                </span>
            );
    }
}
