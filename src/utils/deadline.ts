export function getDaysUntilDeadline(isoDate: string): number {
  const deadline = new Date(isoDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);
  return Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDeadlineLabel(isoDate: string): string {
  const days = getDaysUntilDeadline(isoDate);
  if (days < 0) return "Closed";
  if (days === 0) return "Due today";
  if (days === 1) return "1 day left";
  if (days <= 7) return `${days} days left`;
  const d = new Date(isoDate);
  return `Due ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

export function deadlineUrgency(isoDate: string): "urgent" | "soon" | "normal" | "closed" {
  const days = getDaysUntilDeadline(isoDate);
  if (days < 0) return "closed";
  if (days <= 3) return "urgent";
  if (days <= 14) return "soon";
  return "normal";
}
