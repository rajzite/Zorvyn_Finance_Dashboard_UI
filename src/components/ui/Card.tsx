type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`
        glass-card hover-lift
        rounded-2xl p-6
        shadow-soft
        ${className}
      `}
    >
      {children}
    </div>
  );
}
