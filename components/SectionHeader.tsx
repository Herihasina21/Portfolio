interface SectionHeaderProps {
  titleMain: string;
  titleAccent: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  titleMain,
  titleAccent,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-8 sm:mb-12 ${className}`}>
      <h2 className="section-heading mb-3 text-2xl font-bold tracking-tight text-balance sm:mb-4 sm:text-3xl lg:text-4xl xl:text-5xl">
        <span className="section-title-main">{titleMain}</span>{" "}
        <span className="section-title-accent">{titleAccent}</span>
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
