import { baseApi } from "./baseApi";

export const ordersApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
     getOrders:builder.query({
      query:()=>'/orders',
      providesTags:['Order'],
     }),
     placeOrder:builder.mutation({
        query:()=>({url:'/orders',method:'POST'}),
        invalidatesTags:['Cart','Order'],
     }),
    }),
    overrideExisting:false,
});

export const {useGetOrdersQuery,usePlaceOrderMutation}=ordersApi;