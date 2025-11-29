interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="mb-20">
      <h2>{title}</h2>
      {subtitle && <p style={{ color: '#64748b' }}>{subtitle}</p>}
    </div>
  );
}