const test = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

const raw = test
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split(" ").map(Number));

function isReportSafe(report) {
  const dir = Math.sign(report[1] - report[0]);
  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    if (Math.sign(diff) !== dir || Math.abs(diff) > 3 || !Math.abs(diff))
      return false;
  }
  return true;
}

function part1(reports) {
  return reports.filter(isReportSafe).length;
}

function part2(reports) {
  return reports.filter((report) => {
    if (isReportSafe(report)) return report;
    for (let i = 0; i < report.length; i++) {
      if (isReportSafe(report.toSpliced(i, 1))) return report;
    }
  }).length;
}

console.log(part2(raw));
