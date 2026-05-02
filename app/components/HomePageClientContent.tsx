'use client';

import Link from 'next/link';
import Deals from './Deal';
import News from './News';
import HomeSlides from './HomeSlides';
import HomeStores from './HomeStores';
import ListCategories from './ListCategories';

export default function HomePageClientContent() {
	return (
		<div className='container mx-auto px-3 mt-5'>
			<div className='w-full text-center'>
				<p className='font-bold text-xl mb-5 leading-1 max-[500px]:leading-normal text-gray-700 md:text-3xl sm:text-2xl xl:text-[35px]'>
					Shop Now With Thousands Of Discount Codes
				</p>
				<p className='font-bold text-base leading-none text-gray-700'>
					Huge savings with a completely free discount code constantly updated, over the world
				</p>
			</div>

			<HomeSlides />

			<HomeStores />

			<div className='w-full mt-5'>
				<h3 className='pb-2 pt-12 text-[28px]'>
					Deals Of Today
					<Link href={'#'} className='text-green-500 float-right text-[28px]'>
						Deals
					</Link>
				</h3>
				<Deals />
			</div>

			<div className='w-full mt-5'>
				<h3 className='pb-2 pt-12 text-[28px] text-gray-700'>Feature Post</h3>
				<News />
			</div>

			<ListCategories />
		</div>
	);
}
