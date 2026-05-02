'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Header from '@/app/components/Header';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { useNewsById, useNews } from '@/hooks/useNews';
import { useParams } from 'next/navigation';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';
import { resolveGlobalMediaUrl } from '@/lib/resolveGlobalMediaUrl';
import Loader from '@/app/components/Loader';
import BlogSidebar from './BlogSidebar';

const BlogDetail = () => {
	const params = useParams();
	const { data } = useGlobalConfig();
	const slug = params?.slug as string;
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [slugNotFound, setSlugNotFound] = useState(false);
	const { news: allNews, loading: newsLoading } = useNews();
	const { news: currentNews, loading, error } = useNewsById(selectedId || undefined, !!selectedId);

	useEffect(() => {
		if (!slug || selectedId) return;
		if (allNews.length === 0) {
			if (!newsLoading) {
				setSlugNotFound(true);
			}
			return;
		}

		const match = allNews.find(item => item.slug === slug);
		if (match?._id) {
			setSelectedId(match._id);
			setSlugNotFound(false);
		} else if (!newsLoading) {
			setSlugNotFound(true);
		}
	}, [allNews, slug, selectedId, newsLoading]);

	const getTimestamp = (item: (typeof allNews)[number]) => {
		const dateString = item.updatedAt || item.lastUpdate || item.createdAt || item.formatDate;
		return dateString ? new Date(dateString).getTime() : 0;
	};

	const popularNews = useMemo(
		() =>
			allNews
				.filter(item => item.duyet === 'Yes' && item.slug !== slug)
				.sort((a, b) => getTimestamp(b) - getTimestamp(a))
				.slice(0, 3),
		[allNews, slug]
	);

	if (!selectedId) {
		if (newsLoading) {
			return (
				<div className='w-full min-h-screen flex items-center justify-center'>
					<Loader />
				</div>
			);
		}

		if (slugNotFound) {
			return (
				<div className='w-full min-h-screen flex items-center justify-center'>
					<Loader />
				</div>
			);
		}
	}

	if (loading) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center'>
				<Loader />
			</div>
		);
	}

	if (error || !currentNews) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center'>
				<Loader />
			</div>
		);
	}

	return (
		<>
			<Header />
			<section className='w-full mb-5 min-h-140'>
				<div className='container mx-auto px-3 mt-12'>
					<div className='flex items-center justify-start gap-2 flex-col sm:flex-row'>
						<Link href={'/'} className='text-[#019a04]'>
							Home
							<span className='text-[#019a04]'> / </span>
						</Link>
						<Link href={`/blog`} className='text-[#019a04]'>
							Blog
							<span className='text-[#019a04]'> / </span>
						</Link>
						<Link href={`/blog/${currentNews.slug}`} className='text-[#019a04]'>
							{currentNews.name}
						</Link>
					</div>
				</div>

				<div className='container mt-4 px-3 grid grid-cols-1 md:grid-cols-4 mx-auto gap-x-4'>
					<div className='col-span-3 bg-white p-5'>
						<h1 className='mb-4 text-[28px] font-[540] text-gray-800 line-clamp-2'>{currentNews.name}</h1>
						<div className={`flex items-center justify-start gap-x-2.5 my-5`}>
							<Image
								width={40}
								height={40}
								alt='logo'
								src={resolveGlobalMediaUrl(data?.favicon) ?? '/images/icon.png'}
								className='w-10 h-10 object-cover'
							/>
							<p className='text-sm text-gray-400'>
								{currentNews.lastUpdate || currentNews.formatDate || '2 days ago'}
							</p>
						</div>
						{currentNews.content && (
							<div
								className='leading-8 text-gray-700'
								dangerouslySetInnerHTML={{ __html: currentNews.content }}
							/>
						)}
						{currentNews.description && (
							<p className='leading-8 text-gray-700'>{currentNews.description}</p>
						)}
					</div>

					<BlogSidebar popularNews={popularNews} />
				</div>
			</section>
			<Footer />
		</>
	);
};

export default BlogDetail;
