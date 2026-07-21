const defaultReadableDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "long",
  day: "numeric",
  year: "numeric"
});

function toUtcDate(value) {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function formatUtcDate(date, format) {
  switch (format) {
    case "yyyy":
      return String(date.getUTCFullYear());
    case "yyyy-LL-dd": {
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      return `${date.getUTCFullYear()}-${month}-${day}`;
    }
    case "LLLL d, yyyy":
    default:
      return defaultReadableDateFormatter.format(date);
  }
}

export default function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj, format = "LLLL d, yyyy") => {
    const date = toUtcDate(dateObj);
    if (!date) {
      return "";
    }
    return formatUtcDate(date, format);
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    const date = toUtcDate(dateObj);
    if (!date) {
      return "";
    }
    return formatUtcDate(date, "yyyy-LL-dd");
  });

  eleventyConfig.addPassthroughCopy({ "public/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "content/feed/pretty-atom-feed.xsl": "feed/pretty-atom-feed.xsl" });
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("yandex_0ee9b58dd76ce30e.html");

  return {
    dir: {
      input: "content",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "liquid", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
