// SEO Utilities for common operations

/**
 * Generate a meta title that follows best practices
 * Recommended: 50-60 characters
 */
export const generateMetaTitle = (
  pageName: string,
  siteName: string = "MyApp"
): string => {
  const title = `${pageName} | ${siteName}`;
  return title.length > 60 ? title.substring(0, 57) + "..." : title;
};

/**
 * Generate a meta description that follows best practices
 * Recommended: 150-160 characters
 */
export const generateMetaDescription = (
  description: string,
  maxLength: number = 160
): string => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + "...";
};

/**
 * Generate URL-friendly slug
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Extract keywords from content
 */
export const extractKeywords = (
  text: string,
  count: number = 5
): string[] => {
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3);
  
  const frequency: { [key: string]: number } = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map((entry) => entry[0]);
};

/**
 * Generate breadcrumb items for navigation
 */
export const generateBreadcrumbs = (
  pathname: string,
  labels?: { [key: string]: string }
): Array<{ name: string; href: string }> => {
  const segments = pathname.split("/").filter(Boolean);
  let current = "";

  return [
    { name: "Home", href: "/" },
    ...segments.map((segment) => {
      current += `/${segment}`;
      return {
        name: labels?.[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: current,
      };
    }),
  ];
};

/**
 * Check if content is SEO-friendly
 */
export interface SEOAnalysis {
  hasTitle: boolean;
  hasDescription: boolean;
  hasKeywords: boolean;
  titleLength: number;
  descriptionLength: number;
  wordCount: number;
  hasH1: boolean;
  isOptimal: boolean;
}

export const analyzeSEO = (
  title?: string,
  description?: string,
  keywords?: string,
  content?: string,
  hasH1: boolean = false
): SEOAnalysis => {
  const titleLength = title?.length || 0;
  const descriptionLength = description?.length || 0;
  const wordCount = content?.split(/\s+/).length || 0;

  return {
    hasTitle: !!title && titleLength > 0,
    hasDescription: !!description && descriptionLength > 0,
    hasKeywords: !!keywords,
    titleLength,
    descriptionLength,
    wordCount,
    hasH1,
    isOptimal:
      titleLength >= 30 &&
      titleLength <= 60 &&
      descriptionLength >= 120 &&
      descriptionLength <= 160 &&
      wordCount >= 300 &&
      hasH1,
  };
};

/**
 * Format date for schema.org compliance (ISO 8601)
 */
export const formatDateForSchema = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString();
};

/**
 * Generate canonical URL
 */
export const generateCanonicalUrl = (
  pathname: string,
  baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"
): string => {
  return new URL(pathname, baseUrl).toString();
};

/**
 * Generate Twitter handle from URL
 */
export const getTwitterHandle = (url: string): string => {
  const match = url.match(/twitter\.com\/([@\w]+)/i);
  return match ? `@${match[1]}` : "";
};

/**
 * Truncate text for display
 */
export const truncateText = (
  text: string,
  length: number = 100,
  suffix: string = "..."
): string => {
  if (text.length <= length) return text;
  return text.substring(0, length).trimEnd() + suffix;
};
