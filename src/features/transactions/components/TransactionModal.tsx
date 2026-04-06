import { useState } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";

export default function TransactionModal({ onClose }: { onClose: () => void }) {
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
      type: form.type as "income" | "expense",
    });

    onClose();
  };

  return (
    <div className="glass-card p-6 rounded-2xl w-96 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Add Transaction
      </h2>

      <input
        placeholder="Amount"
        className="input w-full mb-3"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <input
        placeholder="Category"
        className="input w-full mb-3"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <select
        className="input w-full mb-4"
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary px-4 py-1 rounded-xl"
        >
          Add
        </button>
      </div>
    </div>
  );
}
