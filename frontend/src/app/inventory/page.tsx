export default function InventoryPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Inventory</h1>
      <div className="card text-sm">
        <p className="font-semibold">SKU-BR-12 Brake Pad Set</p>
        <p>Stock: 3 • Reorder Level: 5 • Unit Cost: $45 • Unit Price: $120</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">Create Purchase Request</button>
    </section>
  );
}
