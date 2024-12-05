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
      for (const [l, r] of rules) {
        const a = page.indexOf(l);
        const b = page.indexOf(r);
        if (a !== -1 && b !== -1 && b < a) {
          sorted = false;
          [page[a], page[b]] = [page[b], page[a]];
        }
      }
    }
    return page;
  })
  .map(getMiddle)
  .reduce(add);

console.log({ part1, part2 });
