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
  // Product Management - Africa/Nigeria
  {
    name: "TechCabal",
    url: "https://techcabal.com",
    rssUrl: "https://techcabal.com/feed/",
    category: "product",
    geo: "africa",
    frequency: "daily",
    apiType: "rss",
  },
  {
    name: "ProductDive Africa",
    url: "https://www.productdive.com",
    rssUrl: "https://www.productdive.com/feed/",
    category: "product",
    geo: "nigeria",
    frequency: "weekly",
    apiType: "rss",
  },
  {
    name: "AltSchool Africa",
    url: "https://blog.altschoolafrica.com",
    rssUrl: "https://blog.altschoolafrica.com/feed/",
    category: "product",
    geo: "africa",
    frequency: "weekly",
    apiType: "rss",
  },
  {
    name: "Techpoint Africa",
    url: "https://techpoint.africa",
    rssUrl: "https://techpoint.africa/feed/",
    category: "product",
    geo: "africa",
    frequency: "daily",
    apiType: "rss",
  },

  // Product Management - Global
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
    name: "Product School",
    url: "https://productschool.com/blog",
    rssUrl: "https://productschool.com/blog/feed/",
    category: "product",
    geo: "global",
    frequency: "daily",
    apiType: "rss",
  },

  // Web3/Crypto - Africa/Nigeria
  {
    name: "Bankless Africa",
    url: "https://banklessafrica.com",
    rssUrl: "https://banklessafrica.com/feed/",
    category: "stablecoins",
    geo: "africa",
    frequency: "weekly",
    apiType: "rss",
  },
  {
    name: "Bitmama Blog",
    url: "https://blog.bitmama.io",
    rssUrl: "https://blog.bitmama.io/feed/",
    category: "stablecoins",
    geo: "nigeria",
    frequency: "weekly",
    apiType: "rss",
  },
  {
    name: "Yellow Card",
    url: "https://yellowcard.io/blog",
    rssUrl: "https://yellowcard.io/blog/feed/",
    category: "stablecoins",
    geo: "africa",
    frequency: "weekly",
    apiType: "rss",
  },

  // Web3/Crypto - Global
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
    name: "Bankless HQ",
    url: "https://banklesshq.com",
    rssUrl: "https://banklesshq.com/feed/",
    category: "stablecoins",
    geo: "global",
    frequency: "weekly",
    apiType: "rss",
  },
  {
    name: "CoinDesk",
    url: "https://www.coindesk.com",
    rssUrl: "https://www.coindesk.com/arc/outboundfeeds/rss/",
    category: "stablecoins",
    geo: "global",
    frequency: "daily",
    apiType: "rss",
  },

  // Stablecoins - Africa/Nigeria
  {
    name: "Quidax Blog",
    url: "https://blog.quidax.com",
    rssUrl: "https://blog.quidax.com/feed/",
    category: "stablecoins",
    geo: "nigeria",
    frequency: "weekly",
    apiType: "rss",
  },
  {
    name: "Bundle Africa",
    url: "https://bundle.africa/blog",
    rssUrl: "https://bundle.africa/blog/feed/",
    category: "stablecoins",
    geo: "africa",
    frequency: "weekly",
    apiType: "rss",
  },

  // Stablecoins - Global
  {
    name: "Circle Blog",
    url: "https://www.circle.com/blog",
    rssUrl: "https://www.circle.com/blog/feed",
    category: "stablecoins",
    geo: "global",
    frequency: "weekly",
    apiType: "rss",
  },
  {
    name: "MakerDAO Blog",
    url: "https://blog.makerdao.com",
    rssUrl: "https://blog.makerdao.com/feed/",
    category: "stablecoins",
    geo: "global",
    frequency: "weekly",
    apiType: "rss",
  },

  // Tech for Non-Techs - Africa/Nigeria
  {
    name: "ForLoop Africa",
    url: "https://forloop.africa",
    rssUrl: "https://forloop.africa/feed/",
    category: "tech-for-non-techs",
    geo: "africa",
    frequency: "weekly",
    apiType: "rss",
  },
  {
    name: "She Code Africa",
    url: "https://shecodeafrica.org",
    rssUrl: "https://shecodeafrica.org/feed/",
    category: "tech-for-non-techs",
    geo: "africa",
    frequency: "weekly",
    apiType: "rss",
  },

  // Tech for Non-Techs - Global
  {
    name: "The Pragmatic Engineer",
    url: "https://blog.pragmaticengineer.com",
    rssUrl: "https://blog.pragmaticengineer.com/feed/",
    category: "tech-for-non-techs",
    geo: "global",
    frequency: "weekly",
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

  // Business - General
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
