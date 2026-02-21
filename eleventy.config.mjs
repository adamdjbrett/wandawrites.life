import { DateTime } from "luxon";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj, format = "LLLL d, yyyy") => {
    if (!dateObj) {
      return "";
    }
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat(format);
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) {
      return "";
    }
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat("yyyy-LL-dd");
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
