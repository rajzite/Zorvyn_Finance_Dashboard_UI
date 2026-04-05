import { useState } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import TransactionRow from "./TransactionRow";
import TransactionModal from "./TransactionModal";
import Card from "@/components/ui/Card";

export default function TransactionList() {
  const role = useFinanceStore((s) => s.role);
  const transactions = useFinanceStore((s) => s.transactions);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const filtered = transactions.filter((t) => {
    return (
      t.category.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "all" || t.type === typeFilter)
    );
  });

  return (
    <Card className="table-card">

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          placeholder="Search..."
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr className="border-b border-gray-200 dark:border-white/10">
              <th className="py-3 text-left">Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  📭 No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <TransactionRow key={t.id} t={t} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Button */}
      {role === "admin" && (
        <button
          onClick={() => setOpen(true)}
          className="btn-primary mt-4"
        >
          + Add Transaction
        </button>
      )}

      {open && <TransactionModal onClose={() => setOpen(false)} />}
    </Card>
  );
}