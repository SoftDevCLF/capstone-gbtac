// components/KpiCard.jsx
export default function KpiCard({ title, value, unit, subtitle, color = "bg-white" }) {
  return (
    
    <div className={`${color} rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow`}>
      {/* KPI Title */}
      <div className="text-white text-sm font-medium">{title}</div>

      {/* KPI Value */}
      <div className="mt-3 flex items-baseline">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit && <span className="text-sm text-white ml-1">{unit}</span>}
      </div>

      {/* Optional Subtitle */}
      {subtitle && <div className="text-xs text-white mt-1">{subtitle}</div>}
    </div>
  );
}
