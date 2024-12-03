const data = await Bun.file("day3.txt").text();
const test = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

function mul(op) {
  const [_, a, b] = /(\d+),(\d+)/.exec(op);
  return +a * +b;
}

const part1 = data
  .match(/mul\(\d+,\d+\)/g)
  .reduce((acc, cur) => acc + mul(cur), 0);

let flag = true;
const part2 = data
  .match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g)
  .reduce((acc, cur) => {
    if (flag && cur.includes("mul")) {
      return acc + mul(cur);
    }
    flag = cur === "do()";
    return acc;
  }, 0);

console.log({ part1, part2 });
