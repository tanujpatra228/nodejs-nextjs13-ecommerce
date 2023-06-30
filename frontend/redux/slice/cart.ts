import { createSlice } from '@reduxjs/toolkit';
import { addToCart, getCart, removeFromCart, updateQty } from './cartMethods';


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isLoading: false,
        data: {},
        isError: false,
    },
    reducers: {
        clearCart: (state) => {
            state.data = {};
        },
    },
    extraReducers(builder) {
        // Get Cart
        builder.addCase(getCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload) state.data = action.payload;
        });
        builder.addCase(getCart.rejected, (state, action) => {
            state.isLoading = false;
        });

        // Add to Cart
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

        // Remove from Cart
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

        // Update Qty
        builder.addCase(updateQty.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateQty.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload && action.payload.status === 'success') state.data = action.payload;
        });
        builder.addCase(updateQty.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;