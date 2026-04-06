type StatCardProps = {
  title: string;
  value: number;
  accent?: "income" | "expense" | "balance";
};

export default function StatCard({ title, value, accent }: StatCardProps) {
  return (
    <div className="glass-card hover-lift p-6 rounded-2xl shadow-soft stat-card">
      <p className="stat-title">{title}</p>
      <h2
        className={`stat-value ${
          accent === "income"
            ? "income"
            : accent === "expense"
            ? "expense"
            : accent === "balance"
            ? "balance"
            : ""
        }`}
      >
        ₹ {value.toLocaleString("en-IN")}
      </h2>
    </div>
  );
}
