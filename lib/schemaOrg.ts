// Schema.org structured data helpers for SEO

export const generateOrganizationSchema = (name: string, logo: string, description: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    logo,
    description,
    sameAs: [
      "https://www.facebook.com/",
      "https://www.twitter.com/",
      "https://www.instagram.com/",
    ],
  };
};

export const generateWebsiteSchema = (name: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?timkiem={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
};

export const generateArticleSchema = (
  headline: string,
  description: string,
  image: string,
  datePublished: string,
  dateModified: string,
  authorName: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: authorName,
    },
  };
};

export const generateProductSchema = (
  name: string,
  description: string,
  image: string,
  price: number,
  priceCurrency: string = "USD"
) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    description,
    image,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
    },
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
