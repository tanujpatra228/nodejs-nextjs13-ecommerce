import ShopFilter from "./ShopFilter";

type Props = {
    className?: string;
}

const Sidebar = ({ className }: Props) => {

    return (
        <>
            <aside className={`hidden sm:block ${className}`}>
                <div className="sticky top-28">
                    <div className="bg-white shadow-md rounded-md">
                        <div className="px-4 py-5 sm:px-6 divide-y">
                            <ShopFilter filter="Category" filterItems={[{ name: 'Denim Jeans', value: 'denim-jeans' }, { name: 'Trousers', value: 'trousers' }, { name: 'Boxers', value: 'boxer-shorts' }, { name: 'Accessories', value: 'accessories' }]} />

                            <ShopFilter className="mt-5 pt-3" filter="Price" filterItems={[{ name: '100-500', value: '100-500' }, { name: '501-1000', value: '501-1000' }, { name: '1001-2000', value: '1001-2000' }]} />

                            <ShopFilter className="mt-5 pt-3" filter="Discount" filterItems={[{ name: '30%-50%', value: '30-50' }, { name: '10%-29%', value: '10-29' }, { name: '0-9%', value: '0-9' }]} />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;