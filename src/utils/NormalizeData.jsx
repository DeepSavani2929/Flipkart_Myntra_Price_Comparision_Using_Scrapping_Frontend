export const normalizeComparisonData = (data) => {
  const map = {};

  data.forEach((item) => {
    if (!map[item.globalProductKey]) {
      map[item.globalProductKey] = item;
    } else {
      if (item.myntraPrice < map[item.globalProductKey].myntraPrice) {
        map[item.globalProductKey] = item;
      }
    }
  });

  return Object.values(map).map((p) => ({
    ...p,
    cheapest: p.myntraPrice < p.flipkartPrice ? "Myntra" : "Flipkart",
    difference: Math.abs(p.myntraPrice - p.flipkartPrice),
  }));
};
