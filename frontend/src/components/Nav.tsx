import Link from 'next/link';

const links = [
  ['Dashboard', '/dashboard'],
  ['Clients', '/clients'],
  ['Vehicles', '/vehicles'],
  ['Work Orders', '/work-orders'],
  ['Inventory', '/inventory'],
  ['Schedule', '/schedule']
];

export default function Nav() {
  return (
    <nav className="flex flex-wrap gap-2 p-3 bg-white shadow sticky top-0 z-10">
      {links.map(([label, href]) => (
        <Link key={href} href={href} className="px-3 py-2 rounded-xl bg-slate-100 text-sm">{label}</Link>
      ))}
    </nav>
  );
}
