export default function SchedulePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Schedule Calendar</h1>
      <div className="grid gap-2">
        {['08:00', '09:00', '10:00', '11:00'].map(slot => (
          <div className="card text-sm" key={slot}>{slot} - Appointment Slot</div>
        ))}
      </div>
      <p className="text-sm text-slate-500">Automatic reminder notifications are sent via email/SMS.</p>
    </section>
  );
}
