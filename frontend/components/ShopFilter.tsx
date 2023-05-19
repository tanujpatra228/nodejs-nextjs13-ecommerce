"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ShopFilterProps = {
    filter: string;
    filterItems: {
        name: string;
        value: string;
    }[];
    className?: string;
};

const ShopFilter = ({ filter, filterItems, className }: ShopFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    filter = filter.toLowerCase();

    const value = searchParams.get(filter);
    const categories = value ? value.split(",") : [];

    function handleCategoryChange(category: string, isChecked: boolean) {
        const updatedCategories = isChecked
            ? [...categories, category]
            : categories.filter((cat) => cat !== category);

        const params = new URLSearchParams(searchParams.toString());
        console.log('updatedCategories', updatedCategories);

        params.set(filter, updatedCategories.join(","));

        if (updatedCategories.length === 0) params.delete(filter);

        router.replace(`${pathname}?${params}`);
    }

    return (
        <>
            <div className={`${className ? className : ''}`}>
                <h3 className="text-lg leading-6 font-medium text-gray-900 capitalize">
                    {filter}
                </h3>
                <p className="text-sm text-gray-500">Choose a {filter.toLowerCase()} to browse</p>
                {
                    filterItems?.length > 0 ?
                        (
                            <ul className="mt-1">
                                {
                                    filterItems.map((item) => (
                                        <li key={item.value}>
                                            <input
                                                type="checkbox"
                                                checked={categories.includes(item.value)}
                                                id={item.value}
                                                onChange={(e) => handleCategoryChange(item.value, e.target.checked)}
                                            />
                                            <label htmlFor={item.value} className="ml-2 cursor-pointer">{item.name}</label>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : (
                            <p className="mt-3 text-sm text-gray-500">No categories available</p>
                        )
                }
            </div>
        </>
    );
};

export default ShopFilter;
