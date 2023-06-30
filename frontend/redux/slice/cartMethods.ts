import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk('getCart', async (session: Session) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart?user=${session?.user?.email || ''}`);

    if (response.status === 200) {
        return response.data;
    }
    return null;
});

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
    size: string;
};
export const removeFromCart = createAsyncThunk('removeFromCart', async ({ cartId, id, size }: RemoveRequestType) => {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove-product`, { cartId, id, size });

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