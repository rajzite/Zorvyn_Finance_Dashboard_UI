import React, { Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import SummaryCards from "./features/dashboard/components/SummaryCard";
import TransactionList from "./features/transactions/components/TransactionList";
import Charts from "./features/dashboard/components/Charts";
import { motion } from "framer-motion";

const Insights = React.lazy(
  () => import("./features/insights/components/Insights")
);

function App() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen space-y-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SummaryCards />
        </motion.div>

        <Charts />
        <TransactionList />

        <Suspense fallback={<p>Loading Insights...</p>}>
          <Insights />
        </Suspense>

      </div>
    </MainLayout>
  );
}

export default App;