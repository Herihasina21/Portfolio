interface Skill {
  name: string;
  logo: string;
}

interface SkillCardProps {
  title: string;
  items: Skill[];
}

export default function SkillCard({ title, items }: SkillCardProps) {
  return (
    <div className="p-8 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-lg hover:border-accent/50 hover:bg-card/40 transition-all duration-500 group relative overflow-hidden">
      {/* Title */}
      <h3 className="text-lg font-semibold text-center mb-8 group-hover:text-accent transition-colors">
        {title}
      </h3>

      {/* Icons grid */}
      <div className="grid grid-cols-3 gap-4">
        {items.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center group/icon cursor-pointer py-2"
          >
            <img
              src={skill.logo}
              alt={skill.name}
              className="w-10 h-10 object-contain transition-all duration-300 group-hover/icon:scale-125"
            />

            {/* Tooltip */}
            <div className="h-8 flex items-center justify-center opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-semibold text-accent whitespace-nowrap bg-background/95 px-2 py-1 rounded-md border border-accent/30">
                {skill.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
