import { create } from "zustand";

type OrderState = {
  orderId: string;
  setOrderId: (id: string) => void;
};

const useStore = create<OrderState>((set) => ({
  orderId: "",
  setOrderId: (id) => set({ orderId: id }),
}));

export default useStore;
