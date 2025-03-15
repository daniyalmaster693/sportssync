const f1TeamLogos = {
  Mercedes: "mercedes",
  Ferrari: "ferrari",
  "red-bull-racing": "red-bull-racing",
  Mclaren: "mclaren",
  Alpine: "alpine",
  "Aston Martin": "aston-martin",
  "Alfa Romeo": "alfa-romeo",
  Haas: "haas",
  Williams: "williams",
  Alphatauri: "alphatauri",
  Sauber: "sauber",
  Audi: "audi",
  Porsche: "porsche",
};

export default function getConstructorLogo(constructorName: string): string {
  return f1TeamLogos[constructorName as keyof typeof f1TeamLogos] || "unknown";
}
