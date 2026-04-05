import { useFinanceStore } from "@/store/useFinanceStore";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

export default function SummaryCards() {
  const transactions = useFinanceStore((s) => s.transactions);

  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const expenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const balance = income - expenses;

  const cards = [
    { title: "Balance", value: balance, color: "text-indigo-500" },
    { title: "Income", value: income, color: "text-green-500" },
    { title: "Expenses", value: expenses, color: "text-red-500" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="stat-card">
            <p className="stat-title">{c.title}</p>
            <h2 className={`stat-value ${c.color}`}>
              ₹ {c.value.toLocaleString()}
            </h2>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}