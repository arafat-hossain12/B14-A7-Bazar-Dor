const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

export function formatPrice(n: number): string {
  return toBn(n.toLocaleString("en-US"));
}

export const UNIT_BN: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export function unitLabel(unit: string): string {
  return UNIT_BN[unit] ?? `প্রতি ${unit}`;
}

export function changeText(dir: "up" | "down" | "flat", pct: number) {
  const v = toBn(Math.abs(pct).toFixed(1));
  if (dir === "up") return `▲ ${v}%`;
  if (dir === "down") return `▼ ${v}%`;
  return `— ${v}%`;
}