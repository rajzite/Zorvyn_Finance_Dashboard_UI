import { useState } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import TransactionRow from "./TransactionRow";
import TransactionModal from "./TransactionModal";

export default function TransactionList() {
  const role = useFinanceStore((s) => s.role);
  const transactions = useFinanceStore((s) => s.transactions);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-card p-6 rounded-2xl shadow-soft mt-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          placeholder="Search category..."
          className="p-2 rounded-lg bg-background border border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 rounded-lg bg-background border border-gray-700"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full text-left">
        <thead className="text-gray-400 text-sm">
  <tr>
    <th>Date</th>
    <th>Category</th>
    <th>Amount</th>
    <th>Type</th>
    <th>Actions</th> {/* ✅ Added */}
  </tr>
</thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                <div className="text-center py-10 text-gray-400">
  📭 No transactions yet
</div>
              </td>
            </tr>
          ) : (
            filtered.map((t) => <TransactionRow key={t.id} t={t} />)
          )}
        </tbody>
      </table>

      {/* Add Transaction Button (Admin only) */}
      {role === "admin" && (
        <button
          onClick={() => setOpen(true)}
          className="mt-4 bg-primary px-4 py-2 rounded-xl"
        >
          + Add Transaction
        </button>
      )}

      {open && <TransactionModal onClose={() => setOpen(false)} />}
    </div>
  );
}