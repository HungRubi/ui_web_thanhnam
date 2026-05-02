// Schema.org structured data helpers for SEO

export const generateOrganizationSchema = (name: string, logo: string, description: string, sameAs?: string[]) => {
	const base: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name,
		description,
	};
	if (logo) base.logo = logo;
	if (sameAs && sameAs.length > 0) base.sameAs = sameAs;
	return base;
};

export const generateWebsiteSchema = (name: string, url: string) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name,
		url,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${url}/search?timkiem={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
	};
};

export const generateArticleSchema = (
	headline: string,
	description: string,
	image: string | undefined,
	datePublished: string,
	dateModified: string,
	authorName: string
) => {
	const o: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline,
		description: description || undefined,
		datePublished: datePublished || undefined,
		dateModified: dateModified || datePublished || undefined,
		author: {
			'@type': 'Person',
			name: authorName,
		},
	};
	if (image) o.image = image;
	return o;
};

export const generateProductSchema = (
	name: string,
	description: string,
	image: string | undefined,
	price: number,
	priceCurrency: string = 'USD'
) => {
	const o: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name,
		description: description || undefined,
		offers: {
			'@type': 'Offer',
			price,
			priceCurrency,
		},
	};
	if (image) o.image = image;
	return o;
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
};

export const generateCollectionPageSchema = (name: string, description: string, url: string, image?: string) => {
	const o: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name,
		url,
	};
	if (description) o.description = description;
	if (image) o.image = image;
	return o;
};
