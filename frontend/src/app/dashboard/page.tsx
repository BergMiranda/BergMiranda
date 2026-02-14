import KpiCard from '../../components/KpiCard';

export default function DashboardPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard title="Open Work Orders" value="18" />
        <KpiCard title="Today's Revenue" value="$4,250" />
        <KpiCard title="Pending Approvals" value="6" />
        <KpiCard title="Low Stock Alerts" value="4" />
      </div>
      <div className="card">
        <h2 className="font-semibold mb-2">Alerts</h2>
        <ul className="list-disc pl-6 text-sm">
          <li>Brake pads SKU-BR-12 below reorder threshold.</li>
          <li>3 estimates waiting for digital signature.</li>
        </ul>
      </div>
    </section>
  );
}
