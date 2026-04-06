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
  const [sort, setSort] = useState("latest");
  const [open, setOpen] = useState(false);

  const filtered = transactions
    .filter((t) => {
      return (
        t.category.toLowerCase().includes(search.toLowerCase()) &&
        (typeFilter === "all" || t.type === typeFilter)
      );
    })
    .sort((a, b) => {
      if (sort === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sort === "amount") {
        return b.amount - a.amount;
      }
      return 0;
    });

  return (
    <Card className="glass-card hover-lift table-card p-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          placeholder="Search..."
          className="input w-full md:w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input w-full md:w-auto"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="input w-full md:w-auto"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="amount">Highest Amount</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 dark:text-gray-400">
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
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-4xl mb-3">📭</div>
                    <p className="text-sm">No transactions yet</p>
                    <p className="text-xs text-gray-500">
                      Add your first transaction to get started
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((t) => <TransactionRow key={t.id} t={t} />)
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
