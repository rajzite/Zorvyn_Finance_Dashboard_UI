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
    { title: "Balance", value: balance, color: "balance" },
    { title: "Income", value: income, color: "income" },
    { title: "Expenses", value: expenses, color: "expense" },
  ];

  return (
    <div className="summary-grid">
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="glass-card stat-card hover-lift p-6">
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
