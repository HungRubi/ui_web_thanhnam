'use client';

import NewsCard from '@/app/components/NewsCard';

type NewsItem = any;

type Props = {
	popularNews: NewsItem[];
};

export default function BlogSidebar({ popularNews }: Props) {
	return (
		<div className='col-span-1 bg-white flex flex-col gap-y-5 p-2.5'>
			<p className='mb-4 text-[24px] font-[540] text-gray-800 line-clamp-2 p-2.5 '>Popular Blog</p>
			{popularNews.map((item: NewsItem) => (
				<NewsCard
					key={item._id}
					title={item.name}
					img={item.image || '/news/1.jpg'}
					subTitle={item.description || ''}
					link={`/blog/${item.slug}`}
					isAuthor={false}
					className='w-full! border-none! shadow-none!'
					isSub='hidden'
					formatDate={item.formatDate}
				/>
			))}
		</div>
	);
}
