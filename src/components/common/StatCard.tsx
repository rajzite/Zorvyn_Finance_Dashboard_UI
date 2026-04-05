export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-glass backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-soft">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold mt-2">₹ {value}</h2>
    </div>
  );
}