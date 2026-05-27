export function getEmployerColor(employer: string): string {
  const colors: Record<string, string> = {
    Stripe: "#635bff",
    Notion: "#000",
    OpenAI: "#10a37f",
    Deloitte: "#86bc25",
    Figma: "#a259ff",
    "McKinsey & Company": "#051c2c",
  };
  return colors[employer] ?? "#6490f2";
}
