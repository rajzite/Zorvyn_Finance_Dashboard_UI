import { create } from "zustand";

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

export type Role = "admin" | "viewer";

export type FinanceState = {
  transactions: Transaction[];
  role: Role;

  // Actions
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
};

// ✅ Load stored transactions safely
const loadStoredTransactions = (): Transaction[] => {
  if (typeof window === "undefined") return []; // SSR safety
  const storedData = localStorage.getItem("finance-data");
  if (!storedData) return [];
  try {
    return JSON.parse(storedData) as Transaction[];
  } catch {
    return [];
  }
};

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: loadStoredTransactions(),

  role: "admin",

  addTransaction: (tx) =>
    set((state) => {
      const updated = [tx, ...state.transactions];
      localStorage.setItem("finance-data", JSON.stringify(updated));
      return { transactions: updated };
    }),

  deleteTransaction: (id) =>
    set((state) => {
      const updated = state.transactions.filter((t) => t.id !== id);
      localStorage.setItem("finance-data", JSON.stringify(updated));
      return { transactions: updated };
    }),

  setRole: (role) => set({ role }),
}));