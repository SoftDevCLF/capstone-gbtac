// components/KpiGrid.jsx
import KpiCard from "./KpiCard";

export default function KpiGrid() {
  const kpis = [
    {
      title: "Total Energy Consumption",
      value: "134,350",
      unit: "kWh + GJ",
      color: "bg-blue-500", 
    },
    {
      title: "Avg Monthly Natural Gas Usage",
      value: "820",
      unit: "GJ",
      color: "bg-green-500", 
    },
    {
      title: "Avg Monthly Electricity Usage",
      value: "10,375",
      unit: "kWh",
      color: "bg-yellow-500", 
    },
    {
      title: "Peak Energy Month",
      value: "January",
      subtitle: "Highest combined usage",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, idx) => (
        <KpiCard
          key={idx}
          title={kpi.title}
          value={kpi.value}
          unit={kpi.unit}
          subtitle={kpi.subtitle}
          color={kpi.color}
        />
      ))}
    </div>
  );
}
