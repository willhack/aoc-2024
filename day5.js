import { Rules, Pages } from "./day5-data";
import { add, getMiddle } from "./utils";

const rules = Rules.trim()
  .split("\n")
  .map((r) => r.split("|").map(Number));

const pages = Pages.trim()
  .split("\n")
  .map((r) => r.split(",").map(Number));

const sortedPages = (page) =>
  rules.every(
    ([a, b]) =>
      page.indexOf(a) === -1 ||
      page.indexOf(b) === -1 ||
      page.indexOf(a) < page.indexOf(b),
  );

const part1 = pages.filter(sortedPages).map(getMiddle).reduce(add);

const part2 = pages
  .filter((page) => !sortedPages(page))
  .map((page) => {
    let sorted = false;
    while (!sorted) {
      sorted = true;
      for (const [a, b] of rules) {
        const aI = page.indexOf(a);
        const bI = page.indexOf(b);
        if (aI !== -1 && bI !== -1 && bI < aI) {
          sorted = false;
          [page[aI], page[bI]] = [page[bI], page[aI]];
        }
      }
    }
    return page;
  })
  .map(getMiddle)
  .reduce(add);

console.log({ part1, part2 });
