import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create api
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    // creating product
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        body: product,
        method: "POST",
      }),
    }),
    // add to cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/products/add-to-cart",
        body: cartInfo,
        method: "POST",
      }),
    }),
    // remove from cart
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: "/products/remove-from-cart",
        body: body,
        method: "POST",
      }),
    }),
    // increase cart product quantity
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/products/increase-cart",
        body: body,
        method: "POST",
      }),
    }),
    // decrease cart product quantity
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/products/decrease-cart",
        body: body,
        method: "POST",
      }),
    }),
    // create order
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        body: body,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
} = appApi;

export default appApi;
