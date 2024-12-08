const data = await Bun.file("day6.txt").text();
const sample = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

let loc = [61, 78]; // Data
//let loc = [6, 4]; // Sample

const rawMap = data
  .trim()
  .split("\n")
  .map((r) => r.split(""));

function inArea([r, c]) {
  return r > -1 && r < rawMap.length && c > -1 && c < rawMap[0].length;
}

const getNext = ([curR, curC], [dirR, dirC]) => [curR + dirR, curC + dirC];

function part1() {
  let cur = loc;
  let next;
  const visited = new Set();
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  function turnRight() {
    dirs.push(dirs.shift());
    next = getNext(cur, dirs[0]);
  }
  while (inArea(cur)) {
    visited.add(cur.toString());
    next = getNext(cur, dirs[0]);
    while (rawMap[next[0]]?.[next[1]] === "#") {
      turnRight();
    }
    cur = next;
  }
  return visited.size;
}

function part2() {
  let total = 0;
  const maps = [];
  for (let r = 0; r < rawMap.length; r++) {
    for (let c = 0; c < rawMap[0].length; c++) {
      if (rawMap[r][c] === ".") {
        const newMap = structuredClone(rawMap);
        newMap[r][c] = "#";
        maps.push(newMap);
      }
    }
  }

  for (const map of maps) {
    let cur = loc;
    let barriers = new Set();
    const dirs = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    let [dir] = dirs;
    let next = [cur[0] + dir[0], cur[1] + dir[1]];

    function turnRight() {
      dirs.push(dirs.shift());
      [dir] = dirs;
      next = [cur[0] + dir[0], cur[1] + dir[1]];
    }

    while (inArea(cur)) {
      next = [cur[0] + dir[0], cur[1] + dir[1]];
      if (map[next[0]]?.[next[1]] === "#") {
        if (barriers.has(`${next.toString()}:${dir.toString()}`)) {
          total++;
          break;
        }
        barriers.add(`${next.toString()}:${dir.toString()}`);
      }
      while (map[next[0]]?.[next[1]] === "#") {
        turnRight();
      }

      cur = next;
    }
  }
  return total;
}

console.log({ part1: part1(), part2: part2() });
// 1812
