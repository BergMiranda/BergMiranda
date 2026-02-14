export default function KpiCard({ title, value }: { title: string; value: string }) {
  return <div className="card"><p className="text-xs text-slate-500">{title}</p><h3 className="text-xl font-semibold">{value}</h3></div>;
}
