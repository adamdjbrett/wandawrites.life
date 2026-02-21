import { execSync } from "node:child_process";

function run(command) {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function uniqPeople(people) {
  const seen = new Set();
  return people.filter((person) => {
    const key = (person.email || person.name || "").toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function parseShortlog(text) {
  if (!text) return [];
  return uniqPeople(
    text
      .split("\n")
      .map((line) => line.match(/^\s*\d+\s+(.+?)\s+<([^>]+)>$/))
      .filter(Boolean)
      .map((match) => ({ name: match[1].trim(), email: match[2].trim() })),
  );
}

function parseCoauthors(text) {
  if (!text) return [];
  const matches = text.matchAll(/Co-authored-by:\s*(.+?)\s*<([^>]+)>/gi);
  return uniqPeople(
    Array.from(matches, (match) => ({
      name: match[1].trim(),
      email: match[2].trim(),
    })),
  );
}

export default () => {
  const authors = parseShortlog(run("git shortlog -sne --all"));
  const coauthors = parseCoauthors(run("git log --format=%B"));
  const contributors = uniqPeople([...authors, ...coauthors]);

  return {
    authors,
    coauthors,
    contributors,
  };
};
