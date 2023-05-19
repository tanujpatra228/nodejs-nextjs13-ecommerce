type SearchParams = {
    discount?: string;
    price?: string;
    category?: string;
    limit?: string;
    skip?: string;
    page?: string;
};

// Fetch All Products
export const getAllProducts = async (searchParams?: SearchParams) => {
    const queryString = searchParams ? objectToQueryString(searchParams) : '';
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products${queryString}`, {
        next: {
            revalidate: 60
        }
    });
    const { products } = await res.json();
    return products;
}

// Fetch Single Product by ID
export const getProductById = async (id: string) => {
    if (!id) return null;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        next: {
            tags: ['singleProduct'],
            revalidate: 60
        }
    });

    const response = await res.json()
    return response;
}

function objectToQueryString(obj: object) {
    const params = new URLSearchParams();
    if (typeof obj !== 'object' || Object.keys(obj).length === 0) return '';

    for (const [key, value] of Object.entries(obj)) {
        params.append(key, value);
    }
    return `?${params.toString()}`;
}