const data = await Bun.file("day4.txt").text();
const sample = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

const p = data
  .split("\n")
  .filter(Boolean)
  .map((r) => r.split(""));

const hasWord = (word, dir, loc) => {
  if (!word.length) return true;
  const [r, c] = [dir[0] + loc[0], dir[1] + loc[1]];
  if (p[r]?.[c] === word[0]) return hasWord(word.slice(1), dir, [r, c]);
  return false;
};

function part1() {
  const surroundingMods = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let total = 0;
  p.forEach((row, r) => {
    row.forEach((char, c) => {
      if (char === "X") {
        surroundingMods.forEach((dir) => {
          if (hasWord("MAS", dir, [r, c])) total += 1;
        });
      }
    });
  });
  return total;
}

function hasCross([r, c]) {
  const mods = [
    [-1, -1],
    [-1, 1],
  ];
  return mods.every(([mr, mc]) => {
    const a = p[r + mr]?.[c + mc];
    const b = p[r - mr]?.[c - mc];
    return (a === "M" || a === "S") && (b === "M" || b === "S") && a !== b;
  });
}

function part2() {
  let total = 0;

  p.forEach((row, r) => {
    row.forEach((char, c) => {
      if (char === "A" && hasCross([r, c])) total += 1;
    });
  });
  return total;
}

console.log(part2());
