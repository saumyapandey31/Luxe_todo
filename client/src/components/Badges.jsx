import { PRIORITIES } from "../utils/constants";

export function PriorityBadge({ priority }) {
  const p = PRIORITIES.find((x) => x.value === priority) || PRIORITIES[1];
  return (
    <span
      className="luxe-pill inline-flex items-center gap-1.5 px-2.5 py-1"
      style={{ background: `${p.color}18`, color: p.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
      {p.label}
    </span>
  );
}

export function CategoryBadge({ category }) {
  return (
    <span className="luxe-pill inline-block px-2.5 py-1 bg-cream text-brown">
      {category}
    </span>
  );
}

export default { PriorityBadge, CategoryBadge };
