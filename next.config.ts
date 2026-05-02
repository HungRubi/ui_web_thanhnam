import type { NextConfig } from 'next';

function tryHostname(raw: string | undefined): string | null {
	if (!raw?.trim()) return null;
	try {
		const withProtocol = raw.includes('://') ? raw : `https://${raw}`;
		return new URL(withProtocol).hostname;
	} catch {
		return null;
	}
}

const apiHost = tryHostname(process.env.NEXT_PUBLIC_API_URL);
const siteHost = tryHostname(process.env.NEXT_PUBLIC_SITE_URL);

type RemotePattern = {
	protocol: 'http' | 'https';
	hostname: string;
	pathname: string;
};

const remotePatterns: RemotePattern[] = [];
const addHost = (hostname: string, protocols: Array<'http' | 'https'>) => {
	for (const protocol of protocols) {
		remotePatterns.push({ protocol, hostname, pathname: '/**' });
	}
};

if (apiHost) {
	addHost(apiHost, ['http', 'https']);
}
if (siteHost && siteHost !== apiHost) {
	addHost(siteHost, ['http', 'https']);
}
addHost('localhost', ['http']);
addHost('127.0.0.1', ['http']);

const nextConfig: NextConfig = {
	images: {
		remotePatterns:
			remotePatterns.length > 0
				? remotePatterns
				: [
						{ protocol: 'https', hostname: '**', pathname: '/**' },
						{ protocol: 'http', hostname: '**', pathname: '/**' },
					],
	},
};

export default nextConfig;
