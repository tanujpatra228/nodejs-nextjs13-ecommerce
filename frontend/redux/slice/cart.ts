import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


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

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isLoading: false,
        data: {},
        isError: false,
    },
    reducers: {
        addToCart: () => { }
    },
    extraReducers(builder) {
        builder.addCase(addToCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload) state.data = action.payload;
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
        });

        builder.addCase(removeFromCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload && action.payload.status === 'success') state.data = action.payload;
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
});

export default cartSlice.reducer;