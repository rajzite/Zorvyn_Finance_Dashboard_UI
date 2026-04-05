import { useFinanceStore } from "@/store/useFinanceStore";
import { useMemo } from "react";
import StatCard from "@/components/common/StatCard"; // ✅ import reusable component
import { motion } from "framer-motion";

export default function SummaryCards() {
  const transactions = useFinanceStore((s) => s.transactions);

  // Memoized calculations for performance
  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  const expenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  const balance = useMemo(() => income - expenses, [income, expenses]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <StatCard title="Total Balance" value={balance} />
      </motion.div>
      <StatCard title="Total Income" value={income} />
      <StatCard title="Total Expenses" value={expenses} />
    </div>
  );
}