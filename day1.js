const raw = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

const processed = raw
  .split("\n")
  .filter(Boolean)
  .map((el) => {
    return el.split(" ").filter(Boolean);
  });

const [l, r] = processed.reduce(
  (acc, [l, r]) => {
    acc[0].push(l);
    acc[1].push(r);
    return acc;
  },
  [[], []],
);

// Part 1
l.sort();
r.sort();

let totalDistance = 0;
for (let i = 0; i < l.length; i++) {
  totalDistance += Math.abs(l[i] - r[i]);
}
console.log(totalDistance);

// Part 2
const res = l
  .map((src) => src * r.reduce((acc, cur) => (cur === src ? acc + 1 : acc), 0))
  .reduce((a, b) => a + b);

console.log(res);
