import SummaryCard from "@/features/dashboard/components/SummaryCard";
import Charts from "@/features/dashboard/components/Charts";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SummaryCard />
      </motion.div>

      <Charts />
    </div>
  );
}