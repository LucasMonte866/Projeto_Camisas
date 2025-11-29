export function StatusBadge({ status }: { status: string }) {
  const cssClass = status === 'ENTREGUE' ? 'badge-ent' : 'badge-env';
  return <span className={`badge ${cssClass}`}>{status}</span>;
}