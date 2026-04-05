type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`
        glass-card hover-lift
        bg-white dark:bg-slate-900
        border border-gray-200 dark:border-white/10
        rounded-2xl p-5 shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}