import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk('addToCart', async (params: CartData) => {
    const { productData, session } = params;
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add-product`, {
        product: productData,
        user: session?.user?.email,
    });

    if (response.status === 200) {
        return response.data;
    }
    return null;
});

type RemoveRequestType = {
    cartId: string;
    id: string;
};
export const removeFromCart = createAsyncThunk('removeFromCart', async ({ cartId, id }: RemoveRequestType) => {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove-product`, { cartId, id });

    if (response.status === 200) {
        return response.data;
    }
    return null;
});

type UpdateQtyRequestType = {
    cartId: string;
    id: string;
    qty: number;
};
export const updateQty = createAsyncThunk('updateQty', async ({ cartId, id, qty }: UpdateQtyRequestType) => {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/cart/update-qty`, { cartId, id, qty });

    if (response.status === 200) {
        return response.data;
    }
    return null;

})