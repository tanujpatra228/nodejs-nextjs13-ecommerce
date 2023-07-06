import EmptyResource from "@/components/ui/EmptyResource";

type Props = {}

const OrderHistoryPage = async (props: Props) => {

    return (
        <>
            <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Order History</h1>
            </div>
            <div className="order-history space-y-3 pt-2">
                <EmptyResource width={300} text="No order history found." className="flex flex-col justify-center items-center" />
            </div>
        </>
    )
}

export default OrderHistoryPage;