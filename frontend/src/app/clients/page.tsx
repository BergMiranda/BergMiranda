export default function ClientsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Client Profiles</h1>
      <div className="card">
        <p className="font-semibold">John Driver</p>
        <p className="text-sm">Individual • john@example.com • +1 555-123-4567</p>
      </div>
      <div className="card">
        <p className="font-semibold">ACME Logistics LLC</p>
        <p className="text-sm">Business • fleet@acme.com • +1 555-222-3344</p>
      </div>
    </section>
  );
}
