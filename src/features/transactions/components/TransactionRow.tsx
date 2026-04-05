import { Transaction } from "@/store/useFinanceStore";
import { useFinanceStore } from "@/store/useFinanceStore";


export default function TransactionRow({ t }: any) {
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);
  const role = useFinanceStore((s) => s.role);

  return (
    <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition">
      <td className="py-3">{t.date}</td>
      <td>{t.category}</td>

      <td className="font-medium">
        ₹ {t.amount.toLocaleString()}
      </td>

      <td className={t.type === "income" ? "text-green-500" : "text-red-500"}>
        {t.type}
      </td>

      <td>
        {role === "admin" && (
          <button
            onClick={() => deleteTransaction(t.id)}
            className="btn-secondary text-red-500"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}