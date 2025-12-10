# SEO Utilities Usage Guide

## Overview
This guide explains how to use the SEO utilities and tools implemented in your Next.js project.

---

## 1. SEO Utilities (`lib/seoUtils.ts`)

### `generateMetaTitle(pageName, siteName?)`
Generates an SEO-friendly meta title (recommended 50-60 chars)

```typescript
import { generateMetaTitle } from "@/lib/seoUtils";

const title = generateMetaTitle("Best Coupons", "ShopHub");
// Output: "Best Coupons | ShopHub"
```

### `generateMetaDescription(description, maxLength?)`
Generates an SEO-friendly meta description (recommended 150-160 chars)

```typescript
import { generateMetaDescription } from "@/lib/seoUtils";

const desc = generateMetaDescription(
  "Find the best discount codes and coupons for your favorite stores...",
  160
);
```

### `generateSlug(text)`
Converts text into URL-friendly slug

```typescript
import { generateSlug } from "@/lib/seoUtils";

const slug = generateSlug("Best Shopping Deals!");
// Output: "best-shopping-deals"
```

### `extractKeywords(text, count?)`
Extracts top keywords from content

```typescript
import { extractKeywords } from "@/lib/seoUtils";

const keywords = extractKeywords(content, 5);
// Output: ["shopping", "deals", "coupons", "discount", "store"]
```

### `generateBreadcrumbs(pathname, labels?)`
Generates breadcrumb navigation items

```typescript
import { generateBreadcrumbs } from "@/lib/seoUtils";

const breadcrumbs = generateBreadcrumbs("/store/amazon/deals", {
  store: "Stores",
  amazon: "Amazon",
  deals: "Current Deals"
});
// Output: [
//   { name: "Home", href: "/" },
//   { name: "Stores", href: "/store" },
//   { name: "Amazon", href: "/store/amazon" },
//   { name: "Current Deals", href: "/store/amazon/deals" }
// ]
```

### `analyzeSEO(title, description, keywords, content, hasH1?)`
Analyzes page content for SEO readiness

```typescript
import { analyzeSEO } from "@/lib/seoUtils";

const analysis = analyzeSEO(
  "Best Coupons | ShopHub",
  "Find the best discount codes...",
  "coupons, deals, discounts",
  contentText,
  true
);

console.log(analysis);
// Output: {
//   hasTitle: true,
//   hasDescription: true,
//   hasKeywords: true,
//   titleLength: 25,
//   descriptionLength: 40,
//   wordCount: 500,
//   hasH1: true,
//   isOptimal: true
// }
```

### `formatDateForSchema(date)`
Formats date for schema.org compliance (ISO 8601)

```typescript
import { formatDateForSchema } from "@/lib/seoUtils";

const formattedDate = formatDateForSchema("2024-01-15");
// Output: "2024-01-15T00:00:00.000Z"
```

### `generateCanonicalUrl(pathname, baseUrl?)`
Generates canonical URL for the page

```typescript
import { generateCanonicalUrl } from "@/lib/seoUtils";

const canonical = generateCanonicalUrl("/blog/best-deals");
// Output: "https://yourdomain.com/blog/best-deals"
```

### `truncateText(text, length?, suffix?)`
Truncates text for display purposes

```typescript
import { truncateText } from "@/lib/seoUtils";

const short = truncateText("Very long text...", 20);
// Output: "Very long text..."
```

---

## 2. Schema.org Helpers (`lib/schemaOrg.ts`)

### `generateOrganizationSchema(name, logo, description)`
Creates Organization schema for your business

```typescript
import { generateOrganizationSchema } from "@/lib/schemaOrg";

const schema = generateOrganizationSchema(
  "ShopHub",
  "https://yourdomain.com/logo.png",
  "Best discount codes and coupons"
);

// Add to layout head:
<script type="application/ld+json">
  {JSON.stringify(schema)}
</script>
```

### `generateWebsiteSchema(name, url)`
Creates Website schema with search action

```typescript
import { generateWebsiteSchema } from "@/lib/schemaOrg";

const schema = generateWebsiteSchema(
  "ShopHub",
  "https://yourdomain.com"
);
```

### `generateArticleSchema(headline, description, image, datePublished, dateModified, authorName)`
Creates BlogPosting schema for news/blog posts

```typescript
import { generateArticleSchema } from "@/lib/schemaOrg";

const schema = generateArticleSchema(
  "Top 10 Shopping Tips",
  "Learn the best shopping strategies...",
  "https://yourdomain.com/image.jpg",
  "2024-01-15",
  "2024-01-16",
  "John Doe"
);

// Usage in blog page:
// app/blog/[slug]/page.tsx
<script type="application/ld+json">
  {JSON.stringify(schema)}
</script>
```

### `generateProductSchema(name, description, image, price, priceCurrency?)`
Creates Product schema for deals/products

```typescript
import { generateProductSchema } from "@/lib/schemaOrg";

const schema = generateProductSchema(
  "Summer Sale",
  "50% off all items",
  "https://yourdomain.com/product.jpg",
  29.99,
  "USD"
);
```

### `generateBreadcrumbSchema(items)`
Creates Breadcrumb schema for navigation

```typescript
import { generateBreadcrumbSchema } from "@/lib/schemaOrg";

const schema = generateBreadcrumbSchema([
  { name: "Home", url: "https://yourdomain.com" },
  { name: "Category", url: "https://yourdomain.com/category" },
  { name: "Product", url: "https://yourdomain.com/category/product" }
]);
```

---

## 3. Implementation Examples

### Example 1: Blog Post Page

```typescript
// app/blog/[slug]/page.tsx
import { generateArticleSchema } from "@/lib/schemaOrg";
import { generateMetaTitle, generateMetaDescription } from "@/lib/seoUtils";
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  return {
    title: generateMetaTitle(post.title, "ShopHub"),
    description: generateMetaDescription(post.excerpt),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      image: post.image,
    },
  };
}

export default function BlogPost({ post }) {
  const schema = generateArticleSchema(
    post.title,
    post.excerpt,
    post.image,
    post.createdAt,
    post.updatedAt,
    post.author
  );

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      
      <article>
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} />
        {/* Content */}
      </article>
    </>
  );
}
```

### Example 2: Store Listing Page

```typescript
// app/store/[slug]/page.tsx
import { generateProductSchema } from "@/lib/schemaOrg";
import { generateMetaTitle } from "@/lib/seoUtils";
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const store = await getStore(params.slug);
  
  return {
    title: generateMetaTitle(`${store.name} Coupons`, "ShopHub"),
    description: `Explore the latest coupons and deals for ${store.name}. Save more with verified discount codes.`,
  };
}

export default function StorePage({ store, deals }) {
  return (
    <>
      {deals.map((deal) => (
        <script
          key={deal._id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateProductSchema(deal.name, deal.description, deal.image, deal.price)
            ),
          }}
        />
      ))}
      
      <h1>{store.name}</h1>
      {/* Store content */}
    </>
  );
}
```

### Example 3: Category Page with Breadcrumbs

```typescript
// app/category/[slug]/page.tsx
import { generateBreadcrumbSchema } from "@/lib/schemaOrg";
import { generateBreadcrumbs } from "@/lib/seoUtils";

export default function CategoryPage({ category, slug }) {
  const breadcrumbs = generateBreadcrumbs(`/category/${slug}`, {
    category: "Categories",
  });

  const schema = generateBreadcrumbSchema(
    breadcrumbs.map((item) => ({
      name: item.name,
      url: `https://yourdomain.com${item.href}`,
    }))
  );

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      
      <nav aria-label="Breadcrumb">
        <ol>
          {breadcrumbs.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ol>
      </nav>

      <h1>{category.name}</h1>
      {/* Content */}
    </>
  );
}
```

---

## 4. Next Steps

1. **Update Environment Variables**
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

2. **Test Your SEO**
   - Use Google Search Console
   - Use Google Rich Results Test
   - Check Core Web Vitals in Lighthouse

3. **Monitor Performance**
   - Check Google Analytics
   - Track keyword rankings
   - Monitor click-through rates (CTR)

4. **Update All Pages**
   - Implement schemas for blog posts
   - Add schemas for product pages
   - Add breadcrumb schemas

5. **Submit to Search Engines**
   - Submit sitemap to Google Search Console
   - Submit sitemap to Bing Webmaster Tools

---

## Resources

- [Next.js SEO Documentation](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org Documentation](https://schema.org)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
