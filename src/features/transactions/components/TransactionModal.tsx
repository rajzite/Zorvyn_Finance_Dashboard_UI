import { useState } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";

export default function TransactionModal({ onClose }: any) {
  const addTransaction = useFinanceStore((s) => s.addTransaction);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
  });

  const handleSubmit = () => {
    if (!form.amount || !form.category) return;

    addTransaction({
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      amount: Number(form.amount),
      category: form.category,
      type: form.type as any,
    });

    onClose();
  };

  return (
    <div className="bg-glass backdrop-blur-md border border-white/10 p-6 rounded-2xl w-96 shadow-soft">
      <div className="bg-card p-6 rounded-2xl w-96 shadow-soft">
        <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

        <input
          placeholder="Amount"
          className="w-full p-2 mb-3 bg-background rounded"
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <input
          placeholder="Category"
          className="w-full p-2 mb-3 bg-background rounded"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <select
          className="w-full p-2 mb-4 bg-background rounded"
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-primary px-4 py-1 rounded-xl"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}