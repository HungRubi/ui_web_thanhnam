import Image from 'next/image';
import { fetchGlobalConfig } from '@/lib/api';
import { resolveGlobalMediaUrl } from '@/lib/resolveGlobalMediaUrl';
import Search from './components/Search';
import HomePageClientContent from './components/HomePageClientContent';
import Footer from './components/Footer';

export default async function Home() {
	const global = await fetchGlobalConfig();
	const logoSrc = resolveGlobalMediaUrl(global.logo) ?? '/images/logo.jpg';
	const isLogoRemote = logoSrc.startsWith('http://') || logoSrc.startsWith('https://');

	return (
		<>
			<nav className='pt-2! relative flex items-center justify-center'>
				<div className='container mx-auto px-4 md:px-6 lg:px-8 w-full'>
					<div className='w-full flex flex-col items-center'>
						<Image
							src={logoSrc}
							alt={global.nameCompany || 'Store'}
							width={300}
							height={170}
							className='max-w-[400px] w-full h-auto object-contain'
							priority
							unoptimized={isLogoRemote}
						/>
						<p className='text-[12px] font-medium'>{global.slogan}</p>
					</div>

					<div className='py-12 w-full'>
						<Search />
					</div>
				</div>
			</nav>

			<HomePageClientContent />

			<div className='w-full'>
				<Footer />
			</div>
		</>
	);
}
