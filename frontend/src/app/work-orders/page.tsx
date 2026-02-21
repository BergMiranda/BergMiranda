import SignatureCapture from '../../components/SignaturePad';

export default function WorkOrdersPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Work Order Workflow</h1>
      <div className="card text-sm space-y-2">
        <p><b>WO-1007</b> • Status: IN_PROGRESS</p>
        <p>Diagnostics: Front brake pulsation; rotor wear.</p>
        <p>Technician notes: Recommend pad + rotor replacement.</p>
        <input className="w-full border rounded-xl p-2" placeholder="Photo URL" />
      </div>
      <div className="card">
        <p className="font-semibold mb-2">Estimate Signature Capture</p>
        <SignatureCapture />
      </div>
    </section>
  );
}
