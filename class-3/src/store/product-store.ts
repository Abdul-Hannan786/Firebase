import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    cart:{},
    modifyCart: (cart: unknown) => set({cart}),
    modifyProduct: (products: unknown) => set({products})
}))