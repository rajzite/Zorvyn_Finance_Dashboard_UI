import { Transaction } from "@/store/useFinanceStore";
import { useFinanceStore } from "@/store/useFinanceStore";


export default function TransactionRow({ t }: { t: Transaction }) {

  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);
  const role = useFinanceStore((s) => s.role);

  return (
    <tr className="border-t border-white/10 hover:bg-white/5 transition">
      <td className="py-3">{t.date}</td>
      <td>{t.category}</td>
      <td>₹ {t.amount}</td>
      <td className={t.type === "income" ? "text-green-400" : "text-red-400"}>
        {t.type}
      </td>
      <td>
        {role === "admin" && (
          <button
            onClick={() => deleteTransaction(t.id)}
            className="bg-primary px-4 py-2 rounded-xl hover:scale-105 active:scale-95 transition">
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}