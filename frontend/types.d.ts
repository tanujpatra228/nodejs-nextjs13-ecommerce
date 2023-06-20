type Product = {
    _id: string;
    itemname: string;
    salerate: number;
    discount: number;
    finalrate: number;
    catid: string;
    category: string;
    subcatid: string;
    subcategory: string;
    itemqty: string;
    itemimage: string;
    itemsize: string[];
}

type SliderImages = {
    category: string;
    img: string;
    alt: string;
};

type CartItem = {
    _id?: string,
    id?: string,
    itemname: string,
    itemimage: string,
    category: string,
    finalrate: number,
    qty: number,
}

type CartData = {
    productData: CartItem,
    session: {
        user?: {
            name?: string | null | undefined
            email?: string | null | undefined
            image?: string | null | undefined
        }
    }
};