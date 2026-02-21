export default class {
  data() {
    return {
      permalink: "/assets/search.json",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const docs = (data.collections?.all || [])
      .filter((item) => item?.url && item?.data?.title)
      .map((item) => ({
        title: item.data.title,
        excerpt: (item.data.excerpt || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
        content: (item.content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
        url: item.url
      }));

    return JSON.stringify(docs, null, 2);
  }
}
