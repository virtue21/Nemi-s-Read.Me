export interface NewsletterSource {
  name: string
  url: string
  rssUrl?: string
  category: string
  geo: string
  frequency: string
  apiType: "rss" | "api" | "scrape"
}

export const newsletterSources: NewsletterSource[] = [
  {
    name: "Lenny's Newsletter",
    url: "https://www.lennysnewsletter.com",
    rssUrl: "https://www.lennysnewsletter.com/feed",
    category: "product",
    geo: "global",
    frequency: "weekly",
    apiType: "rss",
  },
  {
    name: "Mind the Product",
    url: "https://www.mindtheproduct.com",
    rssUrl: "https://www.mindtheproduct.com/feed/",
    category: "product",
    geo: "global",
    frequency: "weekly",
    apiType: "rss",
  },
  {
    name: "The Defiant",
    url: "https://thedefiant.io",
    rssUrl: "https://thedefiant.io/feed/",
    category: "stablecoins",
    geo: "global",
    frequency: "daily",
    apiType: "rss",
  },
  {
    name: "Stack Overflow Blog",
    url: "https://stackoverflow.blog",
    rssUrl: "https://stackoverflow.blog/feed/",
    category: "tech-for-non-techs",
    geo: "global",
    frequency: "daily",
    apiType: "rss",
  },
  {
    name: "Harvard Business Review",
    url: "https://hbr.org",
    rssUrl: "https://feeds.hbr.org/harvardbusiness",
    category: "business",
    geo: "global",
    frequency: "daily",
    apiType: "rss",
  },
]
