import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../../app/api/cartApi";

const cartSlice=createSlice({
    name:'cart',
    initialState:{itemCounts:0},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addMatcher(
               cartApi.endpoints.getCart.matchFulfilled,
               (state,Action)=>{
                state.itemCounts=Action.payload.length;
               }
        );
        builder.addMatcher(
               cartApi.endpoints.removeFromCart.matchFulfilled,
               (state)=>{state.itemCounts=Math.max(0,state.itemCounts-1);}
        );
    },
});

export const selectCartCount=(state)=>state.cart.itemCounts;
export default cartSlice.reducer;