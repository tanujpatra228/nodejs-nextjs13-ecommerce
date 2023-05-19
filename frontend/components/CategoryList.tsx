"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CategoryList = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const value = searchParams.get("category");
    const categories = value ? value.split(",") : [];

    function handleCategoryChange(category: string, isChecked: boolean) {
        const updatedCategories = isChecked
            ? [...categories, category]
            : categories.filter((cat) => cat !== category);

        const params = new URLSearchParams(searchParams.toString());
        params.set("category", updatedCategories.join(","));

        if (updatedCategories.length === 0) params.delete("category");

        router.replace(`${pathname}?${params}`);
    }

    return (
        <>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                Categories
            </h3>
            <p className="mt-1 text-sm text-gray-500">Choose a category to browse</p>
            <ul className="mt-3">
                <li>
                    <input
                        type="checkbox"
                        checked={categories.includes("denim-jeans")}
                        id="denim-jeans"
                        onChange={(e) => handleCategoryChange("denim-jeans", e.target.checked)}
                    />
                    <label htmlFor="denim-jeans" className="ml-2 cursor-pointer">Denim Jeans</label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        checked={categories.includes("trousers")}
                        id="trousers"
                        onChange={(e) => handleCategoryChange("trousers", e.target.checked)}
                    />
                    <label htmlFor="trousers" className="ml-2 cursor-pointer">Trousers</label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        checked={categories.includes("boxers")}
                        id="boxers"
                        onChange={(e) => handleCategoryChange("boxers", e.target.checked)}
                    />
                    <label htmlFor="boxers" className="ml-2 cursor-pointer">Boxers</label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        checked={categories.includes("asseccories")}
                        id="accessories"
                        onChange={(e) => handleCategoryChange("asseccories", e.target.checked)}
                    />
                    <label htmlFor="accessories" className="ml-2 cursor-pointer">Accessories</label>
                </li>
            </ul>
        </>
    );
};

export default CategoryList;
