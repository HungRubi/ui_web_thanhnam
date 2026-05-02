const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

type ResolveOptions = {
	fallback?: string;
};

const isRemoteUrl = (url: string) => {
	return url.startsWith('http://') || url.startsWith('https://');
};

const buildUploadUrl = (path: string) => {
	if (!API_BASE_URL) {
		return '';
	}
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${API_BASE_URL}${normalizedPath}`;
};

export const resolveImageUrl = (imagePath?: string, options: ResolveOptions = {}): string => {
	const fallback = options.fallback ?? '/img_empty.png';

	if (!imagePath || imagePath.trim() === '') {
		return fallback;
	}

	const trimmedPath = imagePath.trim();

	if (isRemoteUrl(trimmedPath)) {
		try {
			new URL(trimmedPath);
			return trimmedPath;
		} catch {
			return fallback;
		}
	}

	if (trimmedPath.startsWith('/upload/') || trimmedPath.startsWith('upload/')) {
		return buildUploadUrl(trimmedPath) || fallback;
	}

	if (trimmedPath.startsWith('/')) {
		return trimmedPath;
	}

	return `/${trimmedPath}`;
};
